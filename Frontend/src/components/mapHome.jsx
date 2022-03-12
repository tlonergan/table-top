import { useEffect } from 'react';
import { Link } from "react-router-dom";

const MapHome = () => {
    useEffect(()=> {
        //TODO: Load existing games
    }, [])

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
                    <p>This is where your games would be if you had any!</p>
                </div>
            </div>
        </>
    );
};

export default MapHome;