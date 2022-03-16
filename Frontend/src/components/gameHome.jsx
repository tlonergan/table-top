import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useAtom } from "jotai";
import { useParams } from 'react-router-dom'

import Loading from "./loading";

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

    console.log("GameHome => render", gameId, isLoaded, activeGame);
    if(!isLoaded)
        return (<Loading />);

    return (
        <>
            <p>Welcome to the home of your game, {activeGame.name}.</p>
        </>
    );
};

export default GameHome;