import { useState } from "react";
import { atom } from 'jotai';
import { useDrop } from 'react-dnd';
import DraggableItemTypes from '../entities/draggableTypes';
import Token from './token';

const MapSquare = ({x, y, children}) => {
    const [droppedItem, setDroppedItem] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [xPostion] = useState(x);
    const [yPostion] = useState(y);

    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: (item, monitor) => {
            setDroppedItem(item);
        },
    }));

    const onSquaredClicked = () => {
        setIsSelected(!isSelected);
    };

    const renderSquareContents = () => {
        if(droppedItem)
            return (<Token data={droppedItem}/>)
    };

    return (
        <div className={"mapSquare " + (isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {renderSquareContents()}
        </div>
    );
};

export default MapSquare;