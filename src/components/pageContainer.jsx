import React from 'react';
import { Provider } from 'jotai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
// import CanvasContainer from './canvasContainer'
import MapBoard from './mapBoard';

const PageContainer = () => {
    return (
        <Provider>
            <div className="navigationBar">
                <span>Table Top</span>
                <div>
                    <button className="menuButton">
                        <FontAwesomeIcon icon={faHamburger}/>
                    </button>
                </div>
            </div>
            {/* <CanvasContainer></CanvasContainer> */}
            <MapBoard/>
        </Provider>
    );
};

export default PageContainer;