import { useState, useEffect, useMemo } from "react";
import { useDrop } from 'react-dnd';
import { atom, useAtom } from 'jotai';
import DraggableItemTypes from '../entities/draggableTypes';
import Token from './token';

const boardSquareAtom = atom({});

const MapSquare = ({x, y}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [xPostion] = useState(x);
    const [yPostion] = useState(y);

    // const boardSquareAtom  = useMemo(() => atom({xPostion, yPostion}), [xPostion, yPostion]);
    const [boardState, setBoardState] = useAtom(boardSquareAtom);

    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: (item) => {
            console.log("map square dropped", item)

            boardState.tokenAtom = item;
            setBoardState(boardState); //WHY ISN'T THIS TRIGGERING A RE-RENDER?!
            // setIsSelected(!isSelected);
        },
    }));

    const onSquaredClicked = () => {
        setIsSelected(!isSelected);
    };

    const renderSquareContents = () => {
        let tokenAtom = boardState.tokenAtom;
        console.log("render square", tokenAtom);
        if(tokenAtom)
            return (<Token data={tokenAtom} parentAtom={boardSquareAtom} />)
    };

    return (
        <div className={"mapSquare " + (isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {renderSquareContents()}
        </div>
    );
};

export default MapSquare;