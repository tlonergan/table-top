import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";

import { updateGameBoardAtom } from "../state/game";
import { updateBoard } from "../services/boardService";
import Card from './card';

const BoardSummary = ({state, gameId}) => {
    console.log("BoardSummary => Render", state, gameId);

    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [board, setBoard] = useAtom(state);
    const [cardButtons, setCardButtons] = useState([]);

    const [, updateStateBoard] = useAtom(updateGameBoardAtom);

    useEffect(() => {
        let buttons = [{display: 'Go To Board', onClick: goToBoardClicked}];
        if(!board.isActive)
            buttons.push({display: 'Make Active', onClick: makeActiveClicked});

        setCardButtons(buttons);
    }, [board]);

    const goToBoardClicked = () => {
        navigate(`board/${board.id}`);
    };

    const makeActiveClicked = () => {
        console.log("BoardSummary => Make Active Clicked", board);

        board.isActive = true;
        updateBoard(getAccessTokenSilently, gameId, board)
        .then((savedBoard) => {
            setBoard(savedBoard);
        });
    };

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