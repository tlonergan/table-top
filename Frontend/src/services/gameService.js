import configuration from "../env.json";
import { getToken, getRequestHeaders } from "./apiRequestHelper";

const hostName = `${configuration.HOST_NAME}api/`;

export const getGames = async (getAccessTokenSilently) => {
    const token = await getToken(getAccessTokenSilently, 'read:games');

    const response = await fetch(
        hostName + 'game',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    .catch(console.error);
    
    if(response.ok)
        return await response.json();
};

export const getGame = async (getAccessTokenSilently, id) =>  {
    if(!id){
        console.error("Id must be set to retrieve game.");
        return;
    }

    const token = await getToken(getAccessTokenSilently, 'read:games');
    const getGameResponse = await fetch(
        `${hostName}game/${id}`,
        {
            method: 'GET',
            headers: getRequestHeaders(token),
        }
    )
    .catch(console.error);

    if(!getGameResponse.ok){
        console.error("Error retrieving game.", getGameResponse);
        return;
    }

    return await getGameResponse.json();
};

export const createGame = async (game, getAccessTokenSilently) => {
    if(!game){
        console.error("Game was not set", game);
        return;
    }

    const token = await getToken(getAccessTokenSilently, 'write:games');

    const createGameResponse = await fetch(
        hostName + 'game',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(game)
        },
        error => console.log("Error Creating Game", error))
    .catch(console.error);

    if(!createGameResponse.ok){
        console.error("Request to create game failed", createGameResponse);
        return;
    }

    return await createGameResponse.json();
}