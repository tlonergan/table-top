import { HubConnectionBuilder } from '@microsoft/signalr';

import configuration from "../env.json";

export const boardHubConnection = new HubConnectionBuilder()
    .withUrl(configuration.HOST_NAME + "board-hub")
    .withAutomaticReconnect()
    .build();

export const startHubConnection = (connection) => {    
    if (connection.state === "Connected")
        return new Promise((resolve) => resolve());
        
    return connection.start();    
};

export const eventKeys = {
    movement: {
        TOKEN_MOVED: "TokenMoved",
        MOVE_TOKEN: "MoveToken"
    }
};