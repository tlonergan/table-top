import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Link } from "react-router-dom";

import { createBoard, getBoards } from '../services/boardService';
import { gameBoardsAtom } from '../state/game';

import Loading from './loading';
import Card from './card';
import { useAtom } from 'jotai';

const BoardHome = ({boards, gameId}) => {
    const { getAccessTokenSilently } = useAuth0();
    const [gameBoards, setGameBoards] = useAtom(gameBoardsAtom);

    const getBoardContent = () => {
        if(!boards || boards.length === 0)
            return (<p>The game has no boards, yet.</p>);

        return (
            <>
                {boards.map(board => (
                    <Card key={board.id} name={board.name}>
                        <Link to={`/board/${board.id}`}>Go To Board</Link>
                        <br/>
                        <Link to={`board/${board.id}`}>Go To Game Board</Link>
                    </Card>
                ))}
            </>
        );
    };

    const createNewBoardClick = () => {
        createBoard(getAccessTokenSilently, gameId)
        .then((createdBoard) => {
            console.log("BoardHome => createNewBoardClick => createBoard Then => ", createBoard);
            setGameBoards([...boards, createdBoard]);
        });
    };

    return (
        <>
            <h2>Boards <a onClick={createNewBoardClick}>Create New</a></h2>
            <div>
                {getBoardContent()}
            </div>
        </>
    );
};


export default withAuthenticationRequired(
    BoardHome,
    { onRedirecting: () => <Loading/>}
);