import { useState, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import Token from './token';
import {v4 as uuid} from 'uuid';

const MapToken = ({state, parentState}) => {
    const id = useMemo(() => uuid(), [parentState]);
    const parentPositionAtom = useMemo(() => 
        atom(
            get => get(parentState).position
        ), [parentState]);

    const parentContentAtom = useMemo(() => atom(
        null,
        (get, set, updatedValue) => {
            const previousParentState = get(parentState);
            let newParentState = ({...previousParentState, tokenAtom: updatedValue});
            set(parentState, newParentState);
        }
    ), [parentState]);

    const [mapToken, setMapToken] = useAtom(state);
    const [parentPosition] = useAtom(parentPositionAtom);
    const [, setParentContent] = useAtom(parentContentAtom);
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        setMapToken(prev => ({...prev, position: parentPosition}));
        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if(!isInitialized)
            return;

        updateParent();
    }, [mapToken])

    const updateParent = () => {
        const mapTokenPosition = mapToken.position;
        if(!mapTokenPosition)
            return;
        if(mapTokenPosition.x !== parentPosition.x || mapTokenPosition.y !== parentPosition.y)
            setParentContent(null);
    };

    return (
        <Token state={mapToken.tokenAtom} mapTokenState={state}/>
    );
};

export default MapToken;