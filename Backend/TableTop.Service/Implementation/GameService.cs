using TableTop.Entities;
using TableTop.Storage;

namespace TableTop.Service.Implementation;

internal class GameService : IGameService
{
    private readonly IGameDataRepository _gameDataRepository;

    public GameService(IGameDataRepository gameDataRepository)
    {
        _gameDataRepository = gameDataRepository;
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

    public async Task<Game?> Get(Guid id)
    {
        Game? game = await _gameDataRepository.Get(id);
        return game;
    }

    public async Task<Game> Create(Game game)
    {
        var createdGame = await _gameDataRepository.Create(game);
        return createdGame;
    }
}