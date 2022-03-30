import { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

import { addPlayer } from '../services/gameService';
import Loading from './loading';

const GameInvite = () => {
    console.log("Rendering GameInvite");

    const { gameId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [ hasError, setHasError] = useState(false);

    useEffect(() => {
        addPlayer(getAccessTokenSilently, gameId)
        .then((isSuccess) => {
            if(isSuccess){
                navigate(`/game/${gameId}`);
                return;
            }

            setHasError(true);
        });
    }, []);
    
    const getBody = () => {
        if(hasError)
            return (<p>Something happened, please try again.</p>);

        return (<Loading />);
    }

    return (
        <div>
            <h1>Welcome to the game! You'll be redirected in a moment.</h1>
            {getBody()}
        </div>
    );
};

export default withAuthenticationRequired(
    GameInvite,
    { onRedirecting: () => <Loading/>}
);