import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import {  useAtom } from 'jotai';

import DraggableItemTypes from '../entities/draggableTypes';
import { tokensAtom } from '../state/token';
import { createMapToken, createSquareContentAtom, addMapTokenAtom } from '../state/board';
import { eventKeys } from '../state/hubConnections';

import MapToken from './mapToken';

const MapSquare = ({state, movementConnection}) => {
    console.log("Render MapSquare")
    const [square, setSquare] = useAtom(state);

    const [contentAtoms, setContentAtoms] = useState([]);
        
    // const [tokens] = useAtom(tokensAtom);
    // const [contents] = useAtom(useMemo(() => createSquareContentAtom(state), [state]));
    // const [, addMapToken] = useAtom(addMapTokenAtom);

    useEffect(() => {
        // movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
    }, []);


    const [,thisMapSquare] = useDrop(() => ({
        accept: DraggableItemTypes.TOKEN,
        drop: ({mapTokenAtom, tokenAtom}) => {       
            if(!mapTokenAtom) {
                mapTokenAtom = createMapToken(square.position, tokenAtom);
            }

            setContentAtoms((previousValue) => [...previousValue, mapTokenAtom]);
            // addMapToken(mapTokenState);

            // setSquare(prev => {
            //     let newSquare = ({...prev});
            //     newSquare.tokenAtom = item;
            //     newSquare.mapTokenAtom = mapTokenState;
                
            //     return newSquare;
            // });
        },
    }));

    const onTokenMovedEvent = (position, mapTokenId, tokenId) => {

        
        // var squarePosition = square.position;
        // if(squarePosition.x !== position.x && squarePosition.y !== position.y)
        //     return;

        // const token = tokens.find(token => token.id === tokenId);
        // addMapToken(createMapToken(square.position, token.atom, mapTokenId));
    };
 
    const onSquaredClicked = () => {
        setSquare(prev => {
            let newSquare = ({...prev});
            newSquare.isSelected = !prev.isSelected;
            return newSquare;
        });
    };

    // const renderSquareContents = () => {
    //     let tokenAtom = square.tokenAtom;
    //     if(!tokenAtom)
    //         return;

    //     let mapTokenAtom = square.mapTokenAtom;
    //     if(!mapTokenAtom) {
    //         mapTokenAtom = createMapToken(square.position, tokenAtom);
    //     }
            
    //     return (<MapToken state={mapTokenAtom} parentState={state} />)
    // };

    return (
        <div className={"mapSquare " + (square.isSelected ? "mapSquareSelected": "")} ref={thisMapSquare} onClick={onSquaredClicked}>
            {contentAtoms.map(mapTokenAtom => (<MapToken key={mapTokenAtom} state={mapTokenAtom} parentState={state} />))}
        </div>
    );
};

export default MapSquare;