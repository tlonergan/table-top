import { atom } from 'jotai';

const internalTokenAtoms = atom([]);

export const allTokenAtoms = atom(
    (get) => get(internalTokenAtoms),
    (_get, set, update) => {
        set(internalTokenAtoms, update);
    }
);