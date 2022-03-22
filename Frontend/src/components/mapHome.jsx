import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { getGames } from '../services/gameService';
import Loading from './loading';
import Card from './card';

const MapHome = () => {

    const [games, setGames] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(()=> {
        getGames(getAccessTokenSilently).then(setGames);
    }, []);

    const getGamesSection = () => {
        if(!games || games.length === 0)
            return (<p>This is where your games would be if you had any!</p>);

        return (
            <>
                {games.map(g => (
                    <React.Fragment key={g.id}>
                        <Card name={`${g.name} ${g.isGameMaster ? "(Game Master)" : ""}`}>
                            <p key={g.id}>{g.name}</p>
                            <Link to={`game/${g.id}`}>Go to game</Link>
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
                <div>
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