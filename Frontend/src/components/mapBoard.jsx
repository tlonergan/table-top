import { useState, useEffect, useMemo } from "react";
import { atom, useAtom } from 'jotai';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { removeSelectedMapToken } from '../state/token';
import { activeBoardAtom } from "../state/board";
import { getBoardHubConnectection, startHubConnection } from '../state/hubConnections';
import { getBoard } from "../services/boardService";
import keyCodes from '../entities/keyCodes';

import Loading from './loading';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';

const MapBoard = () => {
    console.log("Re-render board");

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
        if(board)
            return;

        const boardNotFound = () => navigate('/board-not-found');
        getBoard(getAccessTokenSilently, gameId, boardId)
        .then(board => {
            if(!board){
                boardNotFound();
                return;
            }

            setBoard(board);
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
        let newRows = [];
        let squareAtoms = [];

        const squaresHigh = boardDimensions.height;
        const squaresWide = boardDimensions.width;

        console.log("Creating all Squares on board");
        for (let i = 0; i < squaresHigh; i++) {
            let columns = [];
            for (let j = 0; j < squaresWide; j++) {
                const boardSquareAtom = atom({position: {x: i, y: j}, contents: []});
                boardSquareAtom.debugLabel = "square(" + i + ", " + j + ")";

                const squareContents = board.mapTokens.filter(mapToken => mapToken.position.x === i && mapToken.position.y === j);

                squareAtoms.push(boardSquareAtom);
                columns.push((<MapSquare key={boardSquareAtom} state={boardSquareAtom} movementConnection={movementConnection} gameId={gameId} boardId={boardId} contents={squareContents} />));
            }
    
            newRows.push((<div className="boardColumn" key={"row" + i}>{columns}</div>));
        }

        setRows(newRows);
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
            <div className="board">
                {rows.map(r => r)}
            </div>
        </DndProvider>);
};

export default withAuthenticationRequired(
    MapBoard,
    { onRedirecting: () => <Loading/>}
);
