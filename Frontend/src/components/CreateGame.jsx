import { useState } from 'react';

const CreateGame = () =>  {
    const [game, setGame] = useState({});

    const setName = () => {};

    return (
        <div>
            <div>
                <label>Name</label>
                <input type="text" name="gameName" value={game.name} onChange={setName} />
            </div>
            <div>
                <button>Create Game</button>
            </div>
        </div>
    );
};

export default CreateGame;