import { useState, useEffect, useMemo } from "react";
import { atom, useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { removeSelectedMapToken } from '../state/token';
import { activeBoardAtom } from "../state/board";
import { boardHubConnection, startHubConnection } from '../state/hubConnections';
import { getBoard } from "../services/boardService";
import keyCodes from '../entities/keyCodes';

import Loading from './loading';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';

const MapBoard = () => {
    console.log("Re-render board");
    const movementConnection = useMemo(() => boardHubConnection, []);

    const { boardId } = useParams();

    const [, deleteMapToken] = useAtom(removeSelectedMapToken);
    const [ board, setBoard ] = useAtom(activeBoardAtom);

    const [squaresWide] = useState(0);
    const [squaresHigh] = useState(0);
    const [rows, setRows] = useState([]);

    const { user, getAccessTokenSilently } = useAuth0();
    console.log("User: ", user);

    useEffect(() => {
        window.addEventListener('keyup', onDeleteRemoveSelectedMapToken);

        if(board)
            return;

        getBoard()
        .then();
      }, []);

    useEffect(() => {
        startHubConnection(movementConnection)
            .then (() => setUpBoard());
    }, [squaresWide, squaresHigh]);

    const setUpBoard = () => {
        let newRows = [];
        let squareAtoms = [];

        console.log("Creating all Squares on board");
        for (let i = 0; i < squaresHigh; i++) {
            let columns = [];
            for (let j = 0; j < squaresWide; j++) {
                const boardSquareAtom = atom({position: {x: i, y: j}, contents: []});
                boardSquareAtom.debugLabel = "square(" + i + ", " + j + ")";

                squareAtoms.push(boardSquareAtom);
                columns.push((<MapSquare key={boardSquareAtom} state={boardSquareAtom} movementConnection={movementConnection} />));
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
