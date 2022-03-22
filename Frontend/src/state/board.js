import { atom } from 'jotai';
import { v4 as uuid } from 'uuid';

const allMapTokenAtoms = atom([]);

export const activeBoardAtom = atom(null);

export const createMapToken = (position, tokenAtom, mapTokenId) => {
    if(!mapTokenId)
        mapTokenId = uuid();

    const mapTokenAtom = atom({mapTokenId: mapTokenId, tokenAtom, position});

    return mapTokenAtom;
};

export const addMapTokenAtom = atom(
    null,
    (get, set, updatedItem) => {
        const previousMapTokenAtoms = get(allMapTokenAtoms);
        const newMapToken = get(updatedItem);
        
        const otherAtoms = previousMapTokenAtoms.filter(previousMapTokenAtom => {
            const previousMapToken = get(previousMapTokenAtom);
            return previousMapToken.mapTokenId !== newMapToken.mapTokenId;
        });
        
        set(allMapTokenAtoms, [...otherAtoms, updatedItem]);
    }
)

export const setAllMapTokensAtom = atom(
    null,
    (_get, set, updatedItem) => set(allMapTokenAtoms, updatedItem)
);

export const mapTokens = atom(
    get => {
        const mapTokenAtoms = get(allMapTokenAtoms);
        const mapTokens = [];
        mapTokenAtoms.forEach(mapTokenAtom => mapTokens.push(({...get(mapTokenAtom), atom: mapTokenAtom})));
        return mapTokens;
    }
);