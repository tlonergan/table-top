import React from 'react';
import { Provider } from 'jotai';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

// import CanvasContainer from './canvasContainer'
import MapHome from './mapHome';
import NotFound from './notFound';
import MapBoard from './mapBoard';
import CreateGame from './createGame';
import GameHome from './gameHome';

const PageContainer = () => {
    const { logout } = useAuth0();

    return (
        <Provider>
            <BrowserRouter>
                <div className="navigationBar">
                    <span>Table Top</span>
                    <div>
                        <button className="menuButton" onClick={() => logout()}>
                            <FontAwesomeIcon icon={faHamburger}/>
                        </button>
                    </div>
                </div>
                <div className='pageContainer'>
                    {/* <CanvasContainer></CanvasContainer> */}
                    <Routes>
                        <Route path="/" element={<MapHome/>} />
                        <Route path="game/:gameId" element={<GameHome />} />
                        <Route path="game/create" element={<CreateGame />} />
                        <Route path="board/:boardId" element={<MapBoard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default PageContainer;