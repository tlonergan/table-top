﻿using Microsoft.AspNetCore.SignalR;
using TableTop.Entities;

namespace TableTop;

public class BoardHub : Hub
{
    public async Task MoveToken(Position tokenPosition, Guid mapTokenId, Guid tokenId)
    {
        await Clients.All.SendAsync("TokenMoved", tokenPosition, mapTokenId, tokenId);
    }

    public async Task DeleteToken(Guid mapTokenId)
    {
        await Clients.All.SendAsync("TokenDeleted", mapTokenId);
    }
}