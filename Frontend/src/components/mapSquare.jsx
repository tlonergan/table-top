import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import {  useAtom } from 'jotai';

import DraggableItemTypes from '../entities/draggableTypes';
import { createMapToken, createSquareContentAtom, addMapTokenAtom } from '../state/board';
import { eventKeys } from '../state/hubConnections';

import MapToken from './mapToken';

const MapSquare = ({state, movementConnection}) => {
    const [square, setSquare] = useAtom(state);

    console.log("Render MapSquare", square.position);

    useEffect(() => {
        movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
    }, []);


    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({mapTokenAtom, tokenAtom}) => {
            
            console.log("Dropped Token", square.position);

            if(!mapTokenAtom) {
                mapTokenAtom = createMapToken(square.position, tokenAtom);
            }

            setSquare(previous => ({...previous, contents: [...previous.contents, mapTokenAtom]}));
            // movementConnection.invoke("MoveToken", mapToken.position, mapToken.id, tokenId);
        },
    }));

    const onTokenMovedEvent = (position, mapTokenId, tokenId) => {
    };
 
    const onSquaredClicked = () => {
        setSquare(prev => {
            let newSquare = ({...prev});
            newSquare.isSelected = !prev.isSelected;
            return newSquare;
        });
    };

    return (
        <div className={"mapSquare " + (square.isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {square.contents.map(mapTokenAtom => (<MapToken key={mapTokenAtom} state={mapTokenAtom} parentState={state} />))}
        </div>
    );
};

export default MapSquare;