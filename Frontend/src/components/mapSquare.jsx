import { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import {  useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';

import DraggableItemTypes from '../entities/draggableTypes';
import { createMapToken, mapTokens as mapTokensAtom, addMapTokenAtom } from '../state/board';
import { eventKeys } from '../state/hubConnections';
import { tokensAtom } from '../state/token';

import MapToken from './mapToken';

const MapSquare = ({state, movementConnection}) => {
    console.log("MapSquare Render");

    const [square, setSquare] = useAtom(state);
    const [tokens] = useAtom(tokensAtom);
    const [,addMapToken] = useAtom(addMapTokenAtom);
    const getMapTokens = useAtomCallback(useCallback(
        get => get(mapTokensAtom)
    ));

    useEffect(() => {
        movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
    }, []);


    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({mapTokenAtom, tokenAtom}) => {
            console.log("MapSquare => Drop")
            const existingContent = getExistingContent(mapTokenAtom)
            if(existingContent)
                return;

            if(!mapTokenAtom) {
                mapTokenAtom = createMapToken(square.position, tokenAtom);
                addMapToken(mapTokenAtom);
            }

            console.log("MapSquare => Drop - after checks");
            getMapTokens().then(mapTokens => {
                const mapToken = mapTokens.find(mapToken => mapToken.atom == mapTokenAtom);
                const token = tokens.find(token => token.atom == tokenAtom);
    
                console.log("MapSquare => Drop => getMapToken.then", mapToken, token);
    
                if(!mapToken)
                    return;
                if(!token)
                    return;
                    
                movementConnection.invoke(eventKeys.movement.MOVE_TOKEN, square.position, mapToken.id, token.id);
            });
        },
    }));

    const onTokenMovedEvent = (position, mapTokenId, tokenId) => {
        const squarePosition = square.position;
        if(squarePosition.x !== position.x || squarePosition.y !== position.y)
            return;

        console.log("onTokenMovedEvent - this position");

        getMapTokens().then((mapTokens) => {
            const existingMapToken = mapTokens.find(existingMapToken => existingMapToken.id === mapTokenId);
            if(!existingMapToken){
                const token = tokens.find(t => t.id === tokenId);
                if(!token){
                    return;
                }
    
                const newMapToken = createMapToken(square.position, token.atom, mapTokenId);
                addMapToken(newMapToken);
                addContent(newMapToken);
                return;
            }

            const mapTokenAtom = existingMapToken.atom;
            const existingContent = getExistingContent(mapTokenAtom)

            console.log("onTokenMovedEvent => getMapTokens.then", existingContent);
            if(existingContent)
                return;
                
            addContent(mapTokenAtom);

        });
    };

    const getExistingContent = (content) => square.contents.find(existingContent => existingContent === content);

    const addContent = (content) => {
        console.log("addContent", content);
        const existingContent = getExistingContent(content);
        if(existingContent)
            return;
            
        setSquare(previous => ({...previous, contents: [...previous.contents, content]}));
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