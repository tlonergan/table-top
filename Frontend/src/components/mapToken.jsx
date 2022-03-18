import { useState, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

import { selectMapToken, isSelectedMapTokenAtomCreator } from '../state/token';
import { getBoardHubConnectection, eventKeys } from '../state/hubConnections';

import Token from './token';

const MapToken = ({state, parentState}) => {
    const { gameId, boardId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
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
    const [parentPosition] = useAtom(parentPositionAtom);
    const [,deleteThisFromParent] = useAtom(deleteFromParentAtom);

    const [isSelected] = useAtom(useMemo(() => isSelectedMapTokenAtomCreator(state), [state]));
    const [, setSelected] = useAtom(selectMapToken);

    const [isInitialized, setIsInitialized] = useState(false);
    const [movementConnection, setMovementConnection] = useState(null);
    
    useEffect(() => {
        getBoardHubConnectection(getAccessTokenSilently).then(setMovementConnection);
    }, []);

    useEffect(() => {
        if(!movementConnection)
            return;

        movementConnection.on(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
        movementConnection.on(eventKeys.movement.TOKEN_DELETED, onTokenDeletedEvent);

        setMapToken(prev => ({...prev, position: parentPosition}));
        setIsInitialized(true);

        return () => {
            movementConnection.off(eventKeys.movement.TOKEN_MOVED, onTokenMovedEvent);
            movementConnection.off(eventKeys.movement.TOKEN_DELETED, onTokenDeletedEvent);
        };
    }, [movementConnection]);

    useEffect(() => {
        updateParent();
    }, [mapToken]);

    const updateParent = () => {
        if(!isInitialized)
            return;
            
        const mapTokenPosition = mapToken.position;
        if(!mapTokenPosition)
            return;

        if(mapTokenPosition.x !== parentPosition.x || mapTokenPosition.y !== parentPosition.y){
            movementConnection.invoke(eventKeys.movement.DELETE_TOKEN, {...mapToken, boardId: boardId, game: {id: gameId}});
            deleteThisFromParent();
            return;
        }
    };

    const onTokenMovedEvent = (movedMapToken) => {
        const position = movedMapToken.position;
        const mapTokenId = movedMapToken.mapTokenId;

        if(mapToken.mapTokenId === mapTokenId)
            setMapToken(prev => ({...prev, position: position}));
    }

    const onTokenDeletedEvent = (deletedMapToken) => {
        if(mapToken.mapTokenId !== deletedMapToken.mapTokenId)
            return;

        const mapTokenPosition = mapToken.position;
        const deletedMapTokenPosition = deletedMapToken.position;
        if(!mapTokenPosition || !deletedMapTokenPosition)
            return; 
        if(mapTokenPosition.x === deletedMapTokenPosition.x && mapTokenPosition.y === deletedMapTokenPosition.y)
            return;

        deleteThisFromParent();
    };

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