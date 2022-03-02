import { atom } from 'jotai';
import { v4 as uuid } from 'uuid';

const allMapTokenAtoms = atom([]);

export const createMapToken = (position, tokenAtom, mapTokenId) => {
    if(!mapTokenId)
        mapTokenId = uuid();

    const mapTokenAtom = atom({id: mapTokenId, tokenAtom, position});

    return mapTokenAtom;
};

export const addMapTokenAtom = atom(
    null,
    (get, set, updatedItem) => {
        const previousMapTokenAtoms = get(allMapTokenAtoms);
        const matchingAtom = previousMapTokenAtoms.find((mapTokenAtom) => {
            const newMapToken = get(updatedItem);
            const previousMapToken = get(mapTokenAtom);
            return previousMapToken.id === newMapToken.id;
        });
        
        if(!matchingAtom)
            set(allMapTokenAtoms, [...previousMapTokenAtoms, updatedItem]);
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
        mapTokenAtoms.forEach(mapTokenAtom => mapTokens.push(get(mapTokenAtom)));
        return mapTokens;
    }
);