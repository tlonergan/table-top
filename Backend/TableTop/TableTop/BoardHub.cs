using Microsoft.AspNetCore.SignalR;
using TableTop.Entities;

namespace TableTop;

public class BoardHub : Hub
{
    public async Task MoveToken(Guid tokenId, Position tokenPosition)
    {
        await Clients.All.SendAsync("TokenMoved", tokenId, tokenPosition);
    }
}