import configuration from "../env.json";
import { getToken, getRequestHeaders } from "./apiRequestHelper";

const hostName = `${configuration.HOST_NAME}api`;

export const createBoard = async (getAccessTokenSilently, gameId) => {
    const token = await getToken(getAccessTokenSilently, 'write:boards');

    const createBoardResponse = await fetch(
        `${hostName}/game/${gameId}/board`,
        {
            method: 'POST',
            headers: getRequestHeaders(token),
            body: "{}",
        }
    ).catch(console.error);

    if(!createBoardResponse.ok){
        console.error("Error Creating Board", createBoardResponse);
        return;
    }

    return await createBoardResponse.json();
};

export const updateBoard = async (getAccessTokenSilently, gameId, board) => {
    const token = await getToken(getAccessTokenSilently, 'write:boards');
    console.log("updateBoard", gameId, board);
    const createBoardResponse = await fetch(
        `${hostName}/game/${gameId}/board`,
        {
            method: 'PUT',
            headers: getRequestHeaders(token),
            body: JSON.stringify(board),
        }
    ).catch(console.error);

    if(!createBoardResponse.ok){
        console.error("Error Creating Board", createBoardResponse);
        return;
    }

    return await createBoardResponse.json();
}

export const getBoards = async (getAccessTokenSilently, gameId) => {
    const token = await getToken(getAccessTokenSilently, 'read:boards');

    const getBoardsResponse = await fetch(
        `${hostName}/game/${gameId}/board`,
        {
            method: 'GET',
            headers: getRequestHeaders(token),
        }
    )
    .catch(console.error);

    if(!getBoardsResponse.ok){
        console.error("Unable to retrieve boards.", getBoardsResponse);
        return;
    }

    return await getBoardsResponse.json();
};

export const getBoard = async (getAccessTokenSilently, gameId, boardId) => {
    const token = await getToken(getAccessTokenSilently, 'read:boards');

    const getBoardResponse = await fetch(
        `${hostName}/game/${gameId}/board/${boardId}`,
        {
            method: 'GET',
            headers: getRequestHeaders(token),
        },
    ).catch(console.error);

    if(!getBoardResponse.ok){
        console.error("Unable to retrieve board.", getBoardResponse);
        return;
    }

    return await getBoardResponse.json();
};