import { useState, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';

import { selectMapToken, isSelectedMapTokenAtomCreator } from '../state/token';

import Token from './token';

const MapToken = ({state, parentState}) => {
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
    const [isSelected] = useAtom(useMemo(() => isSelectedMapTokenAtomCreator(state), [state]));
    const [, setSelected] = useAtom(selectMapToken);

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