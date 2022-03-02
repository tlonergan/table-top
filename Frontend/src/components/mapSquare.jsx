import { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import {  useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';

import DraggableItemTypes from '../entities/draggableTypes';
import { createMapToken, mapTokens as mapTokensAtom, addMapTokenAtom } from '../state/board';
import { eventKeys } from '../state/hubConnections';
import { tokensAtom } from '../state/token';

import MapToken from './mapToken';

const mapTokens = [];

const MapSquare = ({state, movementConnection}) => {
    const [square, setSquare] = useAtom(state);
    const [tokens] = useAtom(tokensAtom);
    const getMapTokens = useAtomCallback(useCallback(
        get => get(mapTokensAtom)
    ));

    useEffect(() => {
        movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
    }, []);


    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({mapTokenAtom, tokenAtom}) => {
            if(!mapTokenAtom) {
                mapTokenAtom = createMapToken(square.position, tokenAtom);
                addMapTokenAtom(newMapToken); //this will trigger every square to render
            }

            setSquare(previous => ({...previous, contents: [...previous.contents, mapTokenAtom]}));
        },
    }));

    const onTokenMovedEvent = (position, mapTokenId, tokenId) => {
        const squarePosition = square.position;
        if(squarePosition.x !== position.x || squarePosition.y !== position.y)
            return;

        // const existingMapToken = mapTokens.find(existingMapToken => existingMapToken.id === mapTokenId);
        const mapTokens = await getMapTokens();
        if(existingMapToken)
            return;
        
        const token = tokens.find(t => t.id === tokenId);
        if(!token){
            console.log("Could not find token");
            return;
        }

        const newMapToken = createMapToken(square.position, token.atom, mapTokenId);
        addMapTokenAtom(newMapToken); //this will trigger every square to render
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