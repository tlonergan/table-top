import { atom } from 'jotai';

const internalTokenAtoms = atom([]);
const boardTokensAtom = atom([]);

export const allTokenAtoms = atom(
    (get) => get(internalTokenAtoms),
    (_get, set, update) => {
        set(internalTokenAtoms, update);
    }
);

// export const addTokenToBoard = (tokenAtom) => {};