import { HubConnectionBuilder } from '@microsoft/signalr';
import { getToken } from '../services/apiRequestHelper';

import configuration from "../env.json";

let boardHubConnection = null;
const startHubConnection = (connection) => {    
    if (connection.state === "Connected")
        return new Promise((resolve) => resolve());
        
    return connection.start();    
};

export const getBoardHubConnectection = async (getAccessTokenSilently) => {
    if(boardHubConnection)
        return boardHubConnection;

    const newConnection = new HubConnectionBuilder()
        .withUrl(`${configuration.HOST_NAME}hub/board?access_token=${await getToken(getAccessTokenSilently, 'write:board')}`)
        .withAutomaticReconnect()
        .build();

    boardHubConnection = newConnection;
    await startHubConnection(boardHubConnection);

    return boardHubConnection;
}

export const eventKeys = {
    movement: {
        TOKEN_MOVED: "TokenMoved",
        MOVE_TOKEN: "MoveToken",
        TOKEN_DELETED: "TokenDeleted",
        DELETE_TOKEN: "DeleteToken",
    }
};