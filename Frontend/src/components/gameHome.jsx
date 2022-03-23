import { useEffect, useMemo, useState } from "react";
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useAtom } from "jotai";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import Loading from "./loading";
import BoardHome from "./boardHome";

import { getGame } from "../services/gameService";
import { getActiveGameAtom } from "../state/game";

const GameHome = () => {
    console.log("GameHome => render");

    const activeGameAtom = useMemo(() => getActiveGameAtom(), []);

    const { gameId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ activeGame, setActiveGame ] = useAtom(activeGameAtom);

    useEffect(() => {
        getGame(getAccessTokenSilently, gameId)
        .then((game) => {
            console.log("Active Game: ", game);
            setActiveGame(game);
            setIsLoaded(true);
        });
    }, []);

    if(!isLoaded)
        return (<Loading />);

    const copyInvitationClicked = () => {
        const invitationAddress = `${window.location.origin}/game/${activeGame.id}/invite`;
        navigator.clipboard.writeText(invitationAddress);
    }

    const getGameMasterSection = () => {
        if(!activeGame.isGameMaster)
            return <></>;

        return (
            <>
                <p>Invite Players! <a onClick={copyInvitationClicked}>Copy Invitation Link</a></p>
                <BoardHome boards={activeGame.boards} gameId={gameId} />
            </>
        );
    }

    return (
        <>
            <h1>
                <span>{activeGame.name}</span>
                <a><FontAwesomeIcon icon={faPencil} /></a>
            </h1>
            <p>Welcome to the home of your game.</p>
            <div>
                {getGameMasterSection()}
            </div>
        </>
    );
};

export default withAuthenticationRequired(
    GameHome,
    { onRedirecting: () => <Loading/>}
);