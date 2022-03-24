import React from 'react';
import { Provider } from 'jotai';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import CanvasContainer from './canvasContainer'
import MapHome from './mapHome';
import NotFound from './notFound';
import MapBoard from './mapBoard';
import CreateGame from './createGame';
import GameHome from './gameHome';
import GameInvite from './gameInvite';
import NavigationBar from './navigationBar';

const PageContainer = () => {

    return (
        <Provider>
            <BrowserRouter>
                <NavigationBar />
                <div className='pageContainer'>
                    {/* <CanvasContainer></CanvasContainer> */}
                    <Routes>
                        <Route path="/" element={<MapHome/>} />
                        <Route path="game/create" element={<CreateGame />} />
                        <Route path="game/:gameId/invite" element={<GameInvite />} />
                        <Route path="game/:gameId/board/:boardId" element={<MapBoard />} />
                        <Route path="game/:gameId" element={<GameHome />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};

export default PageContainer;