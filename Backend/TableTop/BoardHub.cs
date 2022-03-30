using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using TableTop.Entities;
using TableTop.Entities.Authorization;
using TableTop.Service;

namespace TableTop;

[Authorize(AuthorizationScopes.WriteBoards)]
public class BoardHub : Hub
{
    private readonly IBoardService _boardService;

    public BoardHub(IBoardService boardService)
    {
        _boardService = boardService;
    }

    public async Task MoveToken(MapToken mapToken)
    {
        ClaimsPrincipal? contextUser = this.Context.User;
        if (contextUser == null)
            return;

        var user = new UserIdentity(contextUser.Identity).User;

        await _boardService.SaveMapToken(mapToken, user);
        await Clients.All.SendAsync("TokenMoved", mapToken);
    }

    public async Task DeleteToken(MapToken mapToken)
    {
        if(Equals(mapToken.Position, new Position(-1, -1)))
        {
            ClaimsPrincipal? contextUser = this.Context.User;
            if (contextUser == null)
                return;

            var user = new UserIdentity(contextUser.Identity).User;

            await _boardService.DeleteMapToken(mapToken, user);
        }

        await Clients.All.SendAsync("TokenDeleted", mapToken);
    }

    public async Task RegisterConnectionToGame(string gameId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
    }

    public async Task UnregisterConnectionToGame(string gameId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameId);
    }

    public async Task RegisterConnectionToBoard(string gameId, Guid boardId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, GetBoardGroupName(gameId, boardId));
        await RegisterConnectionToGame(gameId);
    }

    public async Task UnregisterConnectionToBoard(string gameId, Guid boardId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, GetBoardGroupName(gameId, boardId));
        await UnregisterConnectionToGame(gameId);
    }

    private string GetBoardGroupName(string gameId, Guid boardId)
    {
        return $"{gameId}|{boardId}";
    }
}