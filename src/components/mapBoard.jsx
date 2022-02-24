import { useState, useEffect } from "react";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import MapSquare from "./mapSquare";
import Token from './token';
import TokenBox from './tokenBox';

const MapBoard = () => {
    const [squaresWide, setSquaresWide] = useState(25);
    const [squaresHigh, setSquaresHigh] = useState(25);
    const [rows, setRows] = useState([]);

    useEffect(() => setUpBoard(), [squaresWide, squaresHigh]);

    const setUpBoard = () => {
        let newRows = [];
        for (let i = 0; i < squaresHigh; i++) {
            let columns = [];
            for (let j = 0; j < squaresWide; j++) {
                columns.push((<MapSquare key={"column" + j} x={i} y={j} />));
            }
    
            newRows.push((<div className="boardRow" key={"row" + i}>{columns}</div>));
        }

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
