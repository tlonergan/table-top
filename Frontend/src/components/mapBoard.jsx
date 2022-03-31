import { useState, useEffect, useMemo } from "react";
import { atom, useAtom } from 'jotai';
import { useParams, useNavigate } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';

import { allTokenAtoms, removeSelectedMapToken } from '../state/token';
import { activeBoardAtom } from "../state/board";
import { eventKeys, getBoardHubConnectection } from '../state/hubConnections';
import { getBoard } from "../services/boardService";
import keyCodes from '../entities/keyCodes';

import Loading from './loading';
import MapSquare from "./mapSquare";
import TokenBox from './tokenBox';
import SlideContainer from "./slideContainer";
import { getTokens } from "../api/tokenService";
import CanvasContainer from "./board/canvasContainer";

const MapBoard = () => {
    console.log("Board => Render");

    const { gameId, boardId } = useParams();
    const navigate = useNavigate();

    const [, deleteMapToken] = useAtom(removeSelectedMapToken);
    const [ board, setBoard ] = useAtom(activeBoardAtom);
    const [tokenAtoms, setTokenAtoms] = useAtom(allTokenAtoms);
    
    const [ movementConnection, setMovementConnection ] = useState(null);
    const [ rows, setRows ] = useState([]);

    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        let newTokenAttoms = getTokens().map(token => {
            const tokenAtom = atom(token);
            return tokenAtom;
        });

        setTokenAtoms(newTokenAttoms);

        window.addEventListener('keyup', onDeleteRemoveSelectedMapToken);
        getBoardHubConnectection(getAccessTokenSilently).then(newMovementConnection => {
            console.log("MapBoard => useEffect[] => getBoardHubConnection then", newMovementConnection)
            setMovementConnection(newMovementConnection);
            newMovementConnection.invoke(eventKeys.general.REGISTER_BOARD, gameId, boardId);
        });
        
        const boardNotFound = () => navigate('/board-not-found');
        getBoard(getAccessTokenSilently, gameId, boardId)
        .then(retreivedBoard => {
            if(!retreivedBoard){
                boardNotFound();
                return;
            }

            setBoard(retreivedBoard);
        })
        .catch(boardNotFound);

        return () => setBoard(null);
      }, []);

    useEffect(() => {
        if(!movementConnection || !board)
            return;

        return () => movementConnection.invoke(eventKeys.general.UNREGISTER_BOARD, gameId, boardId);
    }, [movementConnection, board]);

    const onDeleteRemoveSelectedMapToken = (e) => {
        if(e.keyCode !== keyCodes.DELETE && e.keyCode !== keyCodes.BACKSPACE)
            return;

        deleteMapToken(null);
    }

    const getBoardBlock = () => {
        if(!board)
            return <Loading />;

        return (
            <div className="board" style={{width: `${board.width * 80}px`, height: `${board.height * 80}px`}}>
                {/* {rows.map(r => r)} */}
                <CanvasContainer state={activeBoardAtom}/>
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <SlideContainer panels={[{name: 'Tokens', panel: <TokenBox />}, {name: 'Other Toolbox', panel: <Loading/>}]}>
                {getBoardBlock()}
            </SlideContainer>
        </DndProvider>);
};

export default withAuthenticationRequired(
    MapBoard,
    { onRedirecting: () => <Loading/>}
);
