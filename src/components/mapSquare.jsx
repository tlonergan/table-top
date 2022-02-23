import { useEffect, useState, useRef } from "react";

const MapSquare = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    
    const thisMapSquare = useRef(null);

    useEffect(() => {
    });

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