import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { getGames } from '../services/gameService';
import Loading from './loading';
import Card from './card';

const MapHome = () => {
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(()=> {
        getGames(getAccessTokenSilently).then((games => {
            setGames(games);
            setIsLoaded(true);
        }));
    }, []);

    if(!isLoaded)
        return (<Loading />);

    const getGamesSection = () => {
        if(!games || games.length === 0)
            return (<p>This is where your games would be if you had any!</p>);

        return (
            <>
                {games.map(g => (
                    <React.Fragment key={g.id}>
                        <Card name={`${g.name} ${g.isGameMaster ? "(Game Master)" : ""}`} buttons={[{display: 'Go To Game', onClick: () => navigate(`game/${g.id}`)}]}>
                            <p key={g.id}>{g.name}</p>
                        </Card>
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <>
            <h1>Welcome to Table Top Map Slab Simulator 9000!</h1>
            <div>
                <div className="sectionHeader">
                    <h2>
                        Your Games 
                        <Link to="/game/create">Create a new game</Link>
                    </h2>
                </div>
                <div className='cardCarrier'>
                    {getGamesSection()}
                </div>
            </div>
        </>
    );
};

export default withAuthenticationRequired(
    MapHome,
    { onRedirecting: () => <Loading/>}
);