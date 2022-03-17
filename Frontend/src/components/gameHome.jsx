import { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useAtom } from "jotai";
import { useParams } from 'react-router-dom'

import Loading from "./loading";
import BoardHome from "./boardHome";

import { getGame } from "../services/gameService";
import { getActiveGameAtom } from "../state/game";

const GameHome = () => {
    const { gameId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ activeGame, setActiveGame ] = useAtom(getActiveGameAtom());

    useEffect(() => {
        getGame(getAccessTokenSilently, gameId)
        .then((game) => {
            setActiveGame(game);
            setIsLoaded(true);
        });
    }, []);

    if(!isLoaded)
        return (<Loading />);

    const getBoardSection = () => {
        if(!activeGame.boards)
            return (<p>Game does not have any boards, yet. <a>Create One</a></p>);
    };

    return (
        <>
            <p>Welcome to the home of your game, {activeGame.name}.</p>
            <div>
                <BoardHome boards={activeGame.boards} gameId={gameId} />
            </div>
        </>
    );
};

export default withAuthenticationRequired(
    GameHome,
    { onRedirecting: () => <Loading/>}
);