import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { createGame } from '../services/gameService';

const CreateGame = () =>  {
    const { getAccessTokenSilently } = useAuth0();
    const [game, setGame] = useState({name: ''});

    const setName = (e) => {
        setGame({...game, name: e.target.value});
    };

    const createGameClicked = () => {
        if(!game.name){
            console.log("Name not set");
            return;
        }

        createGame(game, getAccessTokenSilently)
        .then((response) => console.log("Response from create game", response));
    };

    return (
        <>
            <h1>Create a Game</h1>
            <div className='form'>
                <div className='formField'>
                    <label>Name</label>
                    <input type="text" name="gameName" value={game.name} onChange={setName} />
                </div>
                <div className='formField'>
                    <button onClick={createGameClicked}>Create Game</button>
                </div>
            </div>
        </>
    );
};

export default CreateGame;