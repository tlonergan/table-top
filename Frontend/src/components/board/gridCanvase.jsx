import { useRef, useEffect } from "react";

const GridCanvas = () => {
    const mapCanvas = useRef(null);

    useEffect(() => {
        if(!mapCanvas)
            return;

        const ctx = mapCanvas.current.getContext("2d");
        drawGrid(ctx);
    }, []);

    const drawGrid = (ctx) => {
        let squareSpacing = 80;

        const canvasWidth = mapCanvas.current.width;
        const canvasHeight = mapCanvas.current.height;

        let verticalLineCount = canvasWidth / squareSpacing;
        let horizontalLineCount = canvasHeight / squareSpacing;

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
    };

    return (
        <>
            <canvas ref={mapCanvas} width="1040" height="1040"></canvas>
        </>
    );
};

export default GridCanvas;