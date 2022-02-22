import React, { useEffect, useState, useRef } from 'react';

const CanvasContainer = () => {
    const mapCanvas = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if(!mapCanvas)
            return;

        const ctx = mapCanvas.current.getContext("2d");
        
        if(!isInitialized)
            drawGrid(ctx);
    });

    const drawGrid = (ctx) => {
        let squareSpacing = 80;

        const canvasWidth = mapCanvas.current.width;
        const canvasHeight = mapCanvas.current.height;

        let verticalLineCount = canvasWidth / squareSpacing;
        let horizontalLineCount = canvasHeight / squareSpacing;

        console.log(verticalLineCount);
        console.log(horizontalLineCount);

        ctx.beginPath();
        ctx.lineWidth = 1;

        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvasHeight);

        ctx.moveTo(0, 0);
        ctx.lineTo(canvasWidth, 0);

        for(let i = 1; i <= verticalLineCount; i++){
            ctx.moveTo(squareSpacing * i, 0);
            ctx.lineTo(squareSpacing * i, canvasHeight);
        }

        for(let i = 1; i <= horizontalLineCount; i++){
            ctx.moveTo(0, squareSpacing * i);
            ctx.lineTo(canvasWidth, squareSpacing * i);
        }

        ctx.moveTo(800, 0);
        ctx.lineTo(800, 800);

        ctx.moveTo(0, 800);
        ctx.lineTo(1500, 800);

        ctx.stroke();

        setIsInitialized(true);
    };

    const onClearClick = () => {
        const ctx = mapCanvas.current.getContext("2d");

        const canvasWidth = mapCanvas.current.width;
        const canvasHeight = mapCanvas.current.height;

        ctx.clearRect(0, 0, canvasHeight, canvasWidth);

        setIsInitialized(false);
    };

    const onHeightChange = (e) => {
        mapCanvas.current.height = e.target.value;
        setIsInitialized(false);
    };

    const onWidthChange = (e) => {
        mapCanvas.current.width = e.target.value;
        setIsInitialized(false);};

    return (
        <div style={{padding: "0 240px"}}>
            <div className="canvasControls">
                <select onChange={onWidthChange}>
                    <option value={400}>400</option>
                    <option value={800}>800</option>
                    <option value={1040} selected={true}>1040</option>
                </select>
                <select onChange={onHeightChange}>
                    <option value={400}>400</option>
                    <option value={800}>800</option>
                    <option value={1040} selected={true}>1040</option>
                </select>
                <button onClick={onClearClick}>Clear</button>
            </div>
            <canvas ref={mapCanvas} width="1040" height="1040"></canvas>
        </div>
    );
};

export default CanvasContainer;