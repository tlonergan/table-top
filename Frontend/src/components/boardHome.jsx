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
            setGameBoards([...gameBoards, atom(createdBoard)]);
        });
    };

    return (
        <div style={{textAlign: 'left',border: "solid", borderWidth: '2px', borderColor: '#161616', borderRadius: '8px'}}>
            <div style={{marginBottom: '16px', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignContent: 'center', background: '#346751', color: 'whitesmoke', borderBottom: 'solid 2px #161616'}}>
                <h2 style={{padding: '0', margin: '0'}}>
                    <span>Boards</span>
                </h2>
                <a className='headerLink' onClick={createNewBoardClick}>Create New</a>
            </div>
            
            <div className='cardCarrier'>
                {getBoardContent()}
            </div>
        </div>
    );
};


export default withAuthenticationRequired(
    BoardHome,
    { onRedirecting: () => <Loading/>}
);