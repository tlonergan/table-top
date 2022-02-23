import { useState, useEffect } from "react";
import MapSquare from "./mapSquare";

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
                columns.push((<MapSquare key={"column" + j} />));
            }
    
            newRows.push((<div className="boardRow" key={"row" + i}>{columns}</div>));
        }

        setRows(newRows);
    };

    return (
        <div className="board">
            {rows.map(r => r)}
        </div>);
};

export default MapBoard;
