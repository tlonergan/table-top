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

export const updateGameBoardAtom = atom(
    null,
    (get, set, updatedBoard) => {
        const game = get(activeGame);
        const otherBoards = game.boards.filter(b => b.id !== updatedBoard.id);
        console.log("Update Game Board Atom => set", game, otherBoards, updatedBoard);
        set(activeGame, {...game, boards: [...otherBoards, updatedBoard]});
    }
);