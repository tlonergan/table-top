import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";

import { updateGameBoardAtom } from "../state/game";
import { updateBoard } from "../services/boardService";
import Card from './card';

const BoardSummary = ({board, gameId}) => {
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [cardButtons, setCardButtons] = useState([]);
    // const [thisBoard, setThisBoard] = useState(board);
    const thisBoard = board;

    const [, updateStateBoard] = useAtom(updateGameBoardAtom);

    useEffect(() => {
        console.log("BoardSummary => useEffect[thisBoard]", thisBoard)
        let buttons = [{display: 'Go To Board', onClick: () => goToBoardClicked(thisBoard.id)}];
        if(!thisBoard.isActive)
            buttons.push({display: 'Make Active', onClick: makeActiveClicked});

        setCardButtons(buttons);
    }, [thisBoard]);

    const goToBoardClicked = (boardId) => {
        navigate(`board/${boardId}`);
    };

    const makeActiveClicked = () => {
        console.log("BoardSummary => Make Active Clicked", thisBoard);

        thisBoard.isActive = true;
        updateBoard(getAccessTokenSilently, gameId, thisBoard)
        .then((savedBoard) => {
            console.log("BoardSummary => Make Active Clicked => updateBoard then", savedBoard);
            // setThisBoard(savedBoard);
            updateStateBoard(savedBoard);
        });
    };

    return (
        <Card name={thisBoard.isActive ? `${thisBoard.name} (Active)`: thisBoard.name} buttons={cardButtons}>
            <div>
                <label>Width: </label>
                <span>{thisBoard.width}</span>
            </div>
            <div>
                <label>Height: </label>
                <span>{thisBoard.height}</span>
            </div>
        </Card>
    );
};

export default BoardSummary;