import { atom } from 'jotai';
import { v4 as uuid } from 'uuid';
import { selectMapToken } from './token';

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

export const createSquareContentAtom = (squareAtom) => atom(
    get => {
        const squarePosition = get(squareAtom).position;
        const mapTokenAtoms = get(allMapTokenAtoms);

        let squaresMapTokens = [];
        mapTokenAtoms.forEach(mapTokenAtom => {
            const mapToken = get(mapTokenAtom);
            const mapTokenPosition = mapToken.position;
            if(mapTokenPosition.x == squarePosition.x && mapTokenPosition.y == squarePosition.y)
                squaresMapTokens.push(mapTokenAtom);
        });

        return squaresMapTokens;
    }
)