import { atom } from "jotai";

const activeGame = atom(null);

export const getActiveGameAtom = () => {
    return activeGame;
};