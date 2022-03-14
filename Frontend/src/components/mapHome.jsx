import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import configuration from "../env.json";
import Loading from './loading';

const MapHome = () => {
    const hostName = configuration.HOST_NAME;

    const [games, setGames] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(()=> {
        getGames();
    }, []);

    const getGames = async () => {
        const token = await getAccessTokenSilently({
            audience: "https://table-top-map.azurewebsites.net/",
            scope: 'read:games',
        })
            .catch(console.error);

        const response = await fetch(
            hostName + 'api/game',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        .catch(console.error);
        
        if(response.ok)
            setGames(await response.json());
    };

    const getGamesSection = () => {
        if(!games || games.length === 0)
            return (<p>This is where your games would be if you had any!</p>);

        return (
            <>
                {games.map(g => (<p key={g.id}>g.name</p>))}
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