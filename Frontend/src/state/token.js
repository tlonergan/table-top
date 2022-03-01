import { atom } from 'jotai';

const selectedMapToken = atom(null);

export const allTokenAtoms = atom([]);

export const tokensAtom = atom(
    get => {
        const tokenAtoms = get(allTokenAtoms);
        const tokens = [];
        tokenAtoms.forEach(tokenAtom => tokens.push(({...get(tokenAtom), atom: tokenAtom})));
        return tokens;
    }
)

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