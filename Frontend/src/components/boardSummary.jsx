import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useAtom } from "jotai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { updateGameBoardAtom } from "../state/game";
import { updateBoard } from "../services/boardService";
import Card from './card';

const BoardSummary = ({state, gameId}) => {
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
        console.log("BoardSummary => Make Active Clicked", board);

        board.isActive = true;
        updateBoard(getAccessTokenSilently, gameId, board)
        .then((savedBoard) => {
            setBoard(savedBoard);
        });
    };

    const editClicked = () => {
        setIsEditMode(true);
    };

    const saveClicked = () => {
        setIsEditMode(false);
    };

    if(isEditMode){
        return (
            <Card name={`${board.name} ${board.isActive ? '(Active)' : ''} - Editing`} buttons={[{display: "Save", onClick: saveClicked}]}>
                <div className="form">
                    <div>
                        <label>Name</label>
                        <input type="text" value={board.name} />
                    </div>
                    <div>
                        <label>Width </label>
                        <input type="text" value={board.width} />
                    </div>
                    <div>
                        <label>Height </label>
                        <input type="text" value={board.height} />
                    </div>
                </div>
            </Card>);
    }

    return (
        <Card name={`${board.name} ${board.isActive ? '(Active)' : ''}`} buttons={cardButtons}>
            <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row-reverse"}}>
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