import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import { createBoard } from '../services/boardService';
import { gameBoards as gameBoardAtoms } from '../state/game';

import Loading from './loading';
import { atom, useAtom } from 'jotai';
import BoardSummary from './boardSummary';

const BoardHome = ({boards, gameId}) => {
    console.log("BoardHome => Render", boards, gameId);

    const { getAccessTokenSilently } = useAuth0();
    const [gameBoards, setGameBoards] = useAtom(gameBoardAtoms);

    const getBoardContent = () => {
        if(!boards || boards.length === 0)
            return (<p>The game has no boards, yet.</p>);

        return (
            <>
                {gameBoards.map(gameBoard => (<BoardSummary key={gameBoard} state={gameBoard} gameId={gameId} />))}
            </>
        );
    };

    const createNewBoardClick = () => {
        createBoard(getAccessTokenSilently, gameId)
        .then((createdBoard) => {
            console.log("BoardHome => createNewBoardClick => createBoard Then => ", createBoard);
            setGameBoards([...gameBoards, atom(createdBoard)]);
        });
    };

    return (
        <>
            <h2>Boards <a onClick={createNewBoardClick}>Create New</a></h2>
            <div className='cardCarrier'>
                {getBoardContent()}
            </div>
        </>
    );
};


export default withAuthenticationRequired(
    BoardHome,
    { onRedirecting: () => <Loading/>}
);