import { useEffect, useState, useRef } from "react";
import { useDrop } from 'react-dnd';
import DraggableItemTypes from '../entities/draggableTypes';

const MapSquare = (props) => {
    const [isSelected, setIsSelected] = useState(false);

    const [{},thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
    }));

    const onSquaredClicked = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div className={"mapSquare " + (isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {props.children}
        </div>
    );
};

export default MapSquare;