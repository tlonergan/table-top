import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';
import CanvasContainer from './canvasContainer'

const PageContainer = () => {
    return (
        <div>
            <div className="navigationBar">
                <span>Table Top</span>
                <div>
                    <button className="menuButton">
                        <FontAwesomeIcon icon={faHamburger}/>
                    </button>
                </div>
            </div>
            <CanvasContainer></CanvasContainer>
        </div>
    );
};

export default PageContainer;