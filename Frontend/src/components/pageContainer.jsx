import React from 'react';
import { Provider } from 'jotai';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

// import CanvasContainer from './canvasContainer'
import MapHome from './mapHome';
import NotFound from './notFound';
import MapBoard from './mapBoard';
import CreateGame from './CreateGame';

const PageContainer = () => {
    return (
        <Provider>
            <BrowserRouter>
                <div className="navigationBar">
                    <span>Table Top</span>
                    <div>
                        <button className="menuButton">
                            <FontAwesomeIcon icon={faHamburger}/>
                        </button>
                    </div>
                </div>
                {/* <CanvasContainer></CanvasContainer> */}
                <Routes>
                    <Route path="/" element={<MapHome/>} />
                    <Route path="game/create" element={<CreateGame />} />
                    <Route path="board/:boardId" element={<MapBoard/>} />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default PageContainer;