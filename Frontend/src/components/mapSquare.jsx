import { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import {  useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils';

import DraggableItemTypes from '../entities/draggableTypes';
import { createMapToken, mapTokens as mapTokensAtom, addMapTokenAtom } from '../state/board';
import { eventKeys } from '../state/hubConnections';
import { tokensAtom } from '../state/token';

import MapToken from './mapToken';

const MapSquare = ({state, movementConnection, gameId, boardId, contents}) => {
    console.log("MapSquare Render");
    
    const [square, setSquare] = useAtom(state);
    const [tokens] = useAtom(tokensAtom);
    const [,addMapToken] = useAtom(addMapTokenAtom);
    const getMapTokens = useAtomCallback(useCallback(
        get => get(mapTokensAtom)
    ));
    
    useEffect(() => {
        movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
        
        const initialContents = [];
        contents.forEach(content => {
            const token = tokens.find(t=> t.tokenId === content.tokenId);

            console.log("existing token atom", token, content.tokenId, tokens);
            const mapTokenAtom = createMapToken(square.squarePosition, token.atom, content.mapTokenId);
            initialContents.push(mapTokenAtom)
            addMapToken(mapTokenAtom);
        });

        setSquare({... square, contents: [...square.contents, ...initialContents]});

        return () => {
            movementConnection.off(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
        };
    }, []);


    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({mapTokenAtom, tokenAtom}) => {
            const existingContent = getExistingContent(mapTokenAtom)
            if(existingContent)
                return;

            if(!mapTokenAtom) {
                mapTokenAtom = createMapToken(square.position, tokenAtom);
                addMapToken(mapTokenAtom);
            }
            
            getMapTokens().then(mapTokens => {
                const mapToken = mapTokens.find(mapToken => mapToken.atom == mapTokenAtom);
                const token = tokens.find(token => token.atom == tokenAtom);
    
                if(!mapToken)
                    return;
                if(!token)
                    return;

                movementConnection.invoke(eventKeys.movement.MOVE_TOKEN, {position: square.position, mapTokenId: mapToken.mapTokenId, tokenId: token.tokenId, game: { id: gameId}, boardId});
            });
        },
    }));

    const onTokenMovedEvent = (mapToken) => {
        const position = mapToken.position;
        const squarePosition = square.position;
        if(squarePosition.x !== position.x || squarePosition.y !== position.y)
            return;

        const mapTokenId = mapToken.mapTokenId;
        getMapTokens().then((mapTokens) => {
            const existingMapToken = mapTokens.find(existingMapToken => existingMapToken.mapTokenId === mapTokenId);
            if(!existingMapToken){
                const tokenId = mapToken.tokenId;
                const token = tokens.find(t => t.tokenId === tokenId);
                if(!token){
                    return;
                }
                
                const newMapToken = createMapToken(square.position, token.atom, mapTokenId);
                addMapToken(newMapToken);
                addContent(newMapToken);
                return;
            }

            const mapTokenAtom = existingMapToken.atom;                
            addContent(mapTokenAtom);
        });
    };

    const getExistingContent = (content) => square.contents.find(existingContent => existingContent === content);

    const addContent = (content) => {        
        setSquare(previous => {
            const previousContents = previous.contents;
            if(!previousContents)
                return ({...previous});

            const existingMapToken = previousContents.find(existingContent => existingContent === content);
            if(existingMapToken)
                return ({...previous});

            return ({...previous, contents: [...previousContents, content]})
        });
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