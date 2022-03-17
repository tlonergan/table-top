import configuration from "../env.json";
import { getToken, getRequestHeaders } from "./tokenService";

const hostName = `${configuration.HOST_NAME}api`;

export const createBoard = async (getAccessTokenSilently, gameId) => {
    const token = await getToken(getAccessTokenSilently, 'write:board');

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

export const getBoards = async (getAccessTokenSilently, gameId) => {
    const token = await getToken(getAccessTokenSilently, 'read:board');

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