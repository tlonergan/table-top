import React, { useEffect, useRef } from 'react';

const CanvasContainer = () => {
    const mapCanvas = useRef(null);

    useEffect(() => {
        console.log(mapCanvas);
        if(!mapCanvas)
            return;

        const ctx = mapCanvas.current.getContext("2d");
        ctx.fillRect(10, 10, 50, 50);
    });

    return (
        <div>
            <canvas ref={mapCanvas}></canvas>
        </div>
    );
};

export default CanvasContainer;