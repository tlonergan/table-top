import { useState, useEffect } from "react";
import { atom, useAtom } from 'jotai';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';

const boardSquareAtomAtoms = atom([]);

const MapBoard = () => {
    console.log("Re-render board");
    const [, setBoardSquareAtoms] = useAtom(boardSquareAtomAtoms);

    const [squaresWide] = useState(25);
    const [squaresHigh] = useState(25);

    const [rows, setRows] = useState([]);

    useEffect(() => setUpBoard(), [squaresWide, squaresHigh]);

    const setUpBoard = () => {
        let newRows = [];
        let squareAtoms = [];
        for (let i = 0; i < squaresHigh; i++) {
            let columns = [];
            for (let j = 0; j < squaresWide; j++) {
                const boardSquareAtom = atom({position: {x: i, y: j}});
                squareAtoms.push(boardSquareAtom);

                columns.push((<MapSquare key={boardSquareAtom} state={boardSquareAtom} />));
            }
    
            newRows.push((<div className="boardRow" key={"row" + i}>{columns}</div>));
        }

        setBoardSquareAtoms(squareAtoms);
        setRows(newRows);
    };

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

export default MapBoard;
