import { atom } from "jotai";

const activeGame = atom(null);

const mapGameBoards = (set, boards) => {
    const gameBoardAtoms = boards.map(b => atom(b));
    set(gameBoards, gameBoardAtoms);
};

export const gameBoards = atom([]);

export const getActiveGameAtom = () => {
    return atom(get => get(activeGame),
        (_get, set, updatedGame) => {
            set(activeGame, updatedGame);
            mapGameBoards(set, updatedGame.boards);
        });
};

export const gameBoardsAtom = atom(
    (get) => get(activeGame).boards,
    (get, set, updatedBoards) => {
        const previousGame = get(activeGame);
        mapGameBoards(set, updatedBoards);
        set(activeGame, {...previousGame, boards: updatedBoards});
    }
);

export const updateGameBoardAtom = atom(
    null,
    (get, set, updatedBoard) => {
        const game = get(activeGame);
        const boards = game.boards;
        const existingBoard = boards.find(b => b.id === updatedBoard.id);
        
        let boardsToSet = [...boards];
        if(existingBoard){
            const index = boards.indexOf(existingBoard);
            boards.splice(index, 1, boardsToSet);
        } else {
            const otherBoards = game.boards.filter(b => b.id !== updatedBoard.id);
            boardsToSet = [...otherBoards, updatedBoard];
        }

        set(activeGame, {...game, boards: boardsToSet});
    }
);