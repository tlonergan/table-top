import { useState } from 'react';
import configuration from "../env.json";

const CreateGame = () =>  {
    const [game, setGame] = useState({name: ''});

    const setName = (e) => {
        setGame({...game, name: e.target.value});
    };

    const createGame = () => {
        if(!game.name){
            console.log("Name not set");
            return;
        }

        const hostAddress = configuration.HOST_NAME;
        fetch(
            hostAddress + 'game',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: game
            },
            error => console.log("Error Creating Game", error))
        .then(response => console.log(response))
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
                    <button onClick={createGame}>Create Game</button>
                </div>
            </div>
        </>
    );
};

export default CreateGame;