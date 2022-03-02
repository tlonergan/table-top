import { useState, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { selectMapToken, isSelectedMapTokenAtomCreator } from '../state/token';
import { boardHubConnection, startHubConnection, eventKeys } from '../state/hubConnections';

import Token from './token';

const MapToken = ({state, parentState}) => {
    const movementConnection = useMemo(() => boardHubConnection, []);
    const parentPositionAtom = useMemo(() => 
        atom(
            get => get(parentState).position
        ), [parentState]);
    const deleteFromParentAtom = useMemo(() => atom(
        null,
        (_get, set, _update) => {
            set(parentState, (previous) => ({...previous, contents: previous.contents.filter((item) => item !== state)}));
        }
    ), [parentState]);

    const [mapToken, setMapToken] = useAtom(state);
    const [token] = useAtom(mapToken.tokenAtom);
    const [parentPosition] = useAtom(parentPositionAtom);
    const [,deleteThisFromParent] = useAtom(deleteFromParentAtom);

    const [isSelected] = useAtom(useMemo(() => isSelectedMapTokenAtomCreator(state), [state]));
    const [, setSelected] = useAtom(selectMapToken);

    const [isInitialized, setIsInitialized] = useState(false);
    const [isMovementConnectionInitialized, setIsMovementConnectionInitialized] = useState(false);
    
    useEffect(() => {
        startHubConnection(movementConnection)
            .then(() => {
                movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
                setIsMovementConnectionInitialized(true);
            }); 

        setMapToken(prev => ({...prev, position: parentPosition}));
        setIsInitialized(true);
        
        movementConnection.invoke("MoveToken", mapToken.position, mapToken.id, token.id);

        return () => {
            movementConnection.off(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
        };
    }, []);

    useEffect(() => {
        updateParent();
    }, [mapToken]);

    const updateParent = () => {
        if(!isInitialized || !isMovementConnectionInitialized)
            return;
            
        const mapTokenPosition = mapToken.position;
        if(!mapTokenPosition)
            return;

        if(mapTokenPosition.x !== parentPosition.x || mapTokenPosition.y !== parentPosition.y){
            deleteThisFromParent();
        }
    };

    const onTokenMovedEvent = (position, mapTokenId) => {
        console.log("MapToken signalr handler", position, mapTokenId)
        // if(mapToken.id === mapTokenId)
        //     setMapToken(prev => ({...prev, position: position}));
    }

    const onMapTokenClicked = (e) => {
        e.stopPropagation();
        if(isSelected){
            setSelected(null);
            return;
        }

        setSelected(state);
    }

    return (
        <div onClick={onMapTokenClicked} className={"mapToken " + (isSelected ? "selected" : "")}>
            <Token state={mapToken.tokenAtom} mapTokenState={state}/>
        </div>
    );
};

export default MapToken;