using System.Security.Principal;
using TableTop.Entities;
using TableTop.Entities.Authorization;
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

    public async Task<Game?> Get(string id)
    {
        Game? game = await _gameDataRepository.Get(id);
        return game;
    }

    public async Task<Game> Create(Game game)
    {
        Game createdGame = await _gameDataRepository.Create(game);
        return createdGame;
    }

    public async Task<List<Game>> GetAll(UserIdentity userIdentity)
    {
        List<Game> games = await _gameDataRepository.GetAll(userIdentity.User);
        return games;
    }

    public async Task SaveMapToken(MapToken mapToken)
    {
        Game mapTokenGame = mapToken.Game;
        Game? game = await Get(mapTokenGame.id);
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
            id = mapTokenGame.id,
            Name = mapTokenGame.id == default ? "Default Game" : "Unnamed",
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