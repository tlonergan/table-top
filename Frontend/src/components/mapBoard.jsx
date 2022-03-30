import { useState, useEffect, useMemo } from "react";
import { atom, useAtom } from 'jotai';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { allTokenAtoms, removeSelectedMapToken } from '../state/token';
import { activeBoardAtom } from "../state/board";
import { eventKeys, getBoardHubConnectection } from '../state/hubConnections';
import { getBoard } from "../services/boardService";
import keyCodes from '../entities/keyCodes';

import Loading from './loading';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';
import SlideContainer from "./slideContainer";
import { getTokens } from "../api/tokenService";

const MapBoard = () => {
    console.log("Board => Render");

    const { gameId, boardId } = useParams();
    const navigate = useNavigate();

    const [, deleteMapToken] = useAtom(removeSelectedMapToken);
    const [ board, setBoard ] = useAtom(activeBoardAtom);
    const [tokenAtoms, setTokenAtoms] = useAtom(allTokenAtoms);
    
    const [ movementConnection, setMovementConnection ] = useState(null);
    const [ rows, setRows ] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let newTokenAttoms = getTokens().map(token => {
            const tokenAtom = atom(token);
            return tokenAtom;
        });

        setTokenAtoms(newTokenAttoms);

        window.addEventListener('keyup', onDeleteRemoveSelectedMapToken);
        getBoardHubConnectection(getAccessTokenSilently).then(newMovementConnection => {
            console.log("MapBoard => useEffect[] => getBoardHubConnection then", newMovementConnection)
            setMovementConnection(newMovementConnection);
            newMovementConnection.invoke(eventKeys.general.REGISTER_BOARD, gameId, boardId);
        });
        
        const boardNotFound = () => navigate('/board-not-found');
        getBoard(getAccessTokenSilently, gameId, boardId)
        .then(retreivedBoard => {
            if(!retreivedBoard){
                boardNotFound();
                return;
            }

            setBoard(retreivedBoard);
        })
        .catch(boardNotFound);

        return () => setBoard(null);
      }, []);

    useEffect(() => {
        if(!movementConnection || !board)
            return;
            
        console.log("MapBoard => useEffect[movementConnection, board]", board);
        setUpBoard();

        return () => movementConnection.invoke(eventKeys.general.UNREGISTER_BOARD, gameId, boardId);
    }, [movementConnection, board]);

    const setUpBoard = () => {
        const squares = [];

        const squaresHigh = board.height;
        const squaresWide = board.width;

        console.log("Creating all Squares on board", squaresWide, squaresHigh);
        const totalNumberOfSquares = squaresHigh * squaresWide;
        let currentY = 0;
        let currentX = 0;

        for(let i = 0; i < totalNumberOfSquares; i++){
            const squareContents = board.mapTokens.filter(mapToken => mapToken.position.x === currentX && mapToken.position.y === currentY);
            
            const boardSquareAtom = atom({position: {x: currentX, y: currentY}, contents: [], boardId: boardId, gameId: gameId});
            boardSquareAtom.debugLabel = `square(${currentX}, ${currentY})`;

            squares.push((<MapSquare key={boardSquareAtom} state={boardSquareAtom} movementConnection={movementConnection} contents={squareContents} />));

            currentX++;
            if(currentX >= squaresWide){
                currentX = 0;
                currentY++;
            }
        }

        setRows(squares);
    };

    const onDeleteRemoveSelectedMapToken = (e) => {
        if(e.keyCode !== keyCodes.DELETE && e.keyCode !== keyCodes.BACKSPACE)
            return;

        deleteMapToken(null);
    }

    const getBoardBlock = () => {
        if(!board)
            return <Loading />;

        return (
            <div className="board" style={{width: `${board.width * 80}px`, height: `${board.height * 80}px`}}>
                {rows.map(r => r)}
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <SlideContainer panels={[{name: 'Tokens', panel: <TokenBox />}, {name: 'Other Toolbox', panel: <Loading/>}]}>
                {getBoardBlock()}
            </SlideContainer>
        </DndProvider>);
};

export default withAuthenticationRequired(
    MapBoard,
    { onRedirecting: () => <Loading/>}
);
