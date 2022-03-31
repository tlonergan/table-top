import React, { useEffect, useState, useRef } from 'react';
import GridCanvas from './gridCanvase';

const CanvasContainer = () => {

    return (
        <div style={{padding: "0 240px"}}>
            <GridCanvas />
        </div>
    );
};

export default CanvasContainer;