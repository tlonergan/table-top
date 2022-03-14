using System.Security.Principal;
using TableTop.Entities;
using TableTop.Entities.People;
using TableTop.Storage;

namespace TableTop.Service.Implementation;

internal class GameService : IGameService
{
    private readonly IGameDataRepository _gameDataRepository;

    public GameService(IGameDataRepository gameDataRepository)
    {
        _gameDataRepository = gameDataRepository;
    }

    public async Task<Game?> Get(Guid id)
    {
        Game? game = await _gameDataRepository.Get(id);
        return game;
    }

    public async Task<Game> Create(Game game)
    {
        Game createdGame = await _gameDataRepository.Create(game);
        return createdGame;
    }

    public async Task<List<Game>> GetAll(IIdentity userIdentity)
    {
        List<Game> games = await _gameDataRepository.GetAll(new User{Username = "Somehow get the username"});
        return games;
    }

    public async Task SaveMapToken(MapToken mapToken)
    {
        Game mapTokenGame = mapToken.Game;
        Game? game = await Get(mapTokenGame.Id);
        if (game == null)
        {
            await CreateGame(mapToken);
            return;
        }

        //TODO: Push changes into existing game
    }

    private async Task CreateGame(MapToken mapToken)
    {
        Game mapTokenGame = mapToken.Game;
        await Create(new Game
        {
            Id = mapTokenGame.Id,
            Name = mapTokenGame.Id == default ? "Default Game" : "Unnamed",
            Boards = new List<Board>
            {
                new Board
                {
                    Id = default,
                    Name = "Unnamed",
                    Height = 25,
                    Width = 25,
                    MapTokens = new List<MapToken> { mapToken }
                }
            }
        });
    }
}