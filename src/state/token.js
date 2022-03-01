import { atom } from 'jotai';

const selectedMapToken = atom(null);

export const selectMapToken = atom(
    null,
    (_get, set, updatedItem) => {
        set(selectedMapToken, updatedItem);
    }
);

export const removeSelectedMapToken = atom(
    null,
    (get, set, _updatedItem) => {
        const mapTokenAtom = get(selectedMapToken);
        if(!mapTokenAtom)
            return;
            
        const previousMapToken = get(mapTokenAtom);
        if(!previousMapToken)
            return;

        let newMapToken = ({...previousMapToken, position: {x: -1, y: -1}});
        set(mapTokenAtom, newMapToken);
    }
);

export const isSelectedMapTokenAtomCreator = (mapTokenAtom) => atom(get => mapTokenAtom === get(selectedMapToken));

export const allTokenAtoms = atom([]);