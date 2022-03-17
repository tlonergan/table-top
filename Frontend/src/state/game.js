import { atom } from "jotai";

const activeGame = atom(null);

export const getActiveGameAtom = () => {
    return activeGame;
};

export const gameBoardsAtom = atom(
    (get) => get(activeGame).boards,
    (get, set, updatedBoards) => {
        const previousGame = get(activeGame);
        set(activeGame, {...previousGame, boards: updatedBoards});
    }
);