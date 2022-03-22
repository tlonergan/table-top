import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import Card from './card';

const BoardSummary = ({board}) => {
    const [cardButtons, setCardButtons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let buttons = [{display: 'Go To Board', onClick: () => goToBoardClicked(board.id)}];
        if(!board.isActive)
            buttons.push({display: 'Make Active', onClick: makeActiveClicked});

        setCardButtons(buttons);
    }, []);

    const goToBoardClicked = (boardId) => {
        navigate(`board/${boardId}`);
    };

    const makeActiveClicked = () => {};

    return (
        <Card name={board.isActive ? `${board.name} (Active)`: board.name} buttons={cardButtons}>
            <div>
                <label>Width: </label>
                <span>{board.width}</span>
            </div>
            <div>
                <label>Height: </label>
                <span>{board.height}</span>
            </div>
        </Card>
    );
};

export default BoardSummary;