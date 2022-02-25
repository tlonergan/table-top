import { useState, useEffect, useMemo } from "react";
import { useDrop } from 'react-dnd';
import { useAtom } from 'jotai';
import DraggableItemTypes from '../entities/draggableTypes';

import Token from './token';

const MapSquare = ({state}) => {
    console.log("re-render square");
    const [square, setSquare] = useAtom(state);

    const [isSelected, setIsSelected] = useState(false);
    const [squareContents, setSquareContents] = useState([]);

    console.log("Board State: ", square);

    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: (item) => {
            console.log("map square dropped", item)

            square.tokenAtom = item;
            setSquare(square); //Not triggering a re-render
            setSquareContents(item, ...squareContents);
            console.log("Board state after update: ", square);
        },
    }));
 
    const onSquaredClicked = () => {
        setIsSelected(!isSelected);
    };

    const renderSquareContents = () => {
        let tokenAtom = square.tokenAtom;
        console.log("render square contents", tokenAtom);
        if(tokenAtom)
            return (<Token data={tokenAtom} state={state} />)
    };

    return (
        <div className={"mapSquare " + (isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {renderSquareContents()}
        </div>
    );
};

export default MapSquare;