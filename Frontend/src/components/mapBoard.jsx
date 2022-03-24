import { useState, useEffect, useMemo } from "react";
import { atom, useAtom } from 'jotai';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { removeSelectedMapToken } from '../state/token';
import { activeBoardAtom } from "../state/board";
import { getBoardHubConnectection } from '../state/hubConnections';
import { getBoard } from "../services/boardService";
import keyCodes from '../entities/keyCodes';

import Loading from './loading';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';

const MapBoard = () => {
    console.log("Board => Render");

    const { gameId, boardId } = useParams();
    const navigate = useNavigate();

    const [, deleteMapToken] = useAtom(removeSelectedMapToken);
    const [ board, setBoard ] = useAtom(activeBoardAtom);
    
    const [ movementConnection, setMovementConnection ] = useState(null);
    const [ boardDimensions, setBoardDimensions ] = useState({width: 0, height: 0});
    const [ rows, setRows ] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        window.addEventListener('keyup', onDeleteRemoveSelectedMapToken);
        getBoardHubConnectection(getAccessTokenSilently).then(setMovementConnection);
        
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
      }, []);

    useEffect(() => {
        if(!board)
            return;
        if(board.width === boardDimensions.width && board.height === boardDimensions.height)
            return;

        setBoardDimensions({width: board.width, height: board.height});
    }, [board]);

    useEffect(() => {
        if(!movementConnection)
            return;

        setUpBoard();
    }, [boardDimensions, movementConnection]);

    const setUpBoard = () => {
        const squares = [];

        const squaresHigh = boardDimensions.height;
        const squaresWide = boardDimensions.width;

        console.log("Creating all Squares on board");
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

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="toolbox">
                <TokenBox/>
            </div>
            <div className="board" style={{width: `${boardDimensions.width * 80}px`, height: `${boardDimensions.height * 80}px`}}>
                {rows.map(r => r)}
            </div>
        </DndProvider>);
};

export default withAuthenticationRequired(
    MapBoard,
    { onRedirecting: () => <Loading/>}
);
