import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { updateGameBoardAtom } from "../state/game";
import { updateBoard } from "../services/boardService";
import Card from './card';
import BoardEdit from "./boardEdit";

const BoardSummary = ({state, gameId}) => {
    console.log("BoardSummary => Render", state, gameId);
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();

    const [board, setBoard] = useAtom(state);
    const [cardButtons, setCardButtons] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

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
        board.isActive = true;
        updateBoard(getAccessTokenSilently, gameId, board)
        .then((savedBoard) => {
            setBoard(savedBoard);
        });
    };

    const editClicked = () => {
        setIsEditMode(true);
    };

    const onEditComplete = (isCancelled) => {
        if(!isCancelled){
            updateBoard(getAccessTokenSilently, gameId, board)
            .then((savedBoard) => {
                setBoard(savedBoard);
            }); 
        }
        setIsEditMode(false);
    };

    if(isEditMode){
        return (
            <BoardEdit state={state} onEditComplete={onEditComplete} />
        );
    }

    return (
        <Card name={`${board.name} ${board.isActive ? '(Active)' : ''}`} buttons={cardButtons}>
            <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", alignItems: "flex-start"}}>
                <div>
                    <a onClick={editClicked}><FontAwesomeIcon icon={faPencil} /></a>
                </div>
                <div>
                    <div>
                        <label>Width: </label>
                        <span>{board.width}</span>
                    </div>
                    <div>
                        <label>Height: </label>
                        <span>{board.height}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BoardSummary;