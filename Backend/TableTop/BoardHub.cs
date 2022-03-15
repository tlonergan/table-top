using Microsoft.AspNetCore.SignalR;
using TableTop.Entities;

namespace TableTop;

public class BoardHub : Hub
{
    public async Task MoveToken(MapToken mapToken)
    {
        await Clients.All.SendAsync("TokenMoved", mapToken);
    }

    public async Task DeleteToken(MapToken mapToken)
    {
        await Clients.All.SendAsync("TokenDeleted", mapToken);
    }
}