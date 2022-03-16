using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using TableTop.Entities;
using User = TableTop.Entities.People.User;

namespace TableTop.Storage.Implementation;

internal class GameDataRepository : IGameDataRepository
{
    private static readonly string ContainerName = "Games";
    private readonly Container _container;

    public GameDataRepository(CosmosClient cosmosClient)
    {
        DatabaseResponse? databaseResponse = cosmosClient.CreateDatabaseIfNotExistsAsync(DataKeys.DatabaseName)
                                                         .Result;
        Database database = databaseResponse.Database;
        ContainerResponse? containerResponse = database.CreateContainerIfNotExistsAsync(ContainerName, "/owner/id")
                                                       .Result;

        _container = containerResponse.Container;
    }

    public async Task<List<Game>> GetAll(User user)
    {
        List<Game> results = new();
        string userId = user.Id;

        using FeedIterator<DataEntities.Game>? feedIterator = _container.GetItemLinqQueryable<DataEntities.Game>()
                                                                        .Where(g => g.Owner.Id == userId || g.Players.Any(p => p.Id == userId))
                                                                        .ToFeedIterator();

        foreach (DataEntities.Game dataGame in await feedIterator.ReadNextAsync())
        {
            var game = MapGame(dataGame, userId);
            results.Add(game);
        }

        return results;
    }

    public async Task<Game?> Get(string id, User user)
    {
        string userId = user.Id;
        using FeedIterator<DataEntities.Game>? feedIterator = _container.GetItemLinqQueryable<DataEntities.Game>()
                                                                        .Where(g => g.Id == id && (g.Owner.Id == userId || g.Players.Any(p => p.Id == userId)))
                                                                        .ToFeedIterator();

        foreach (DataEntities.Game? game in await feedIterator.ReadNextAsync())
        {
            return MapGame(game, userId);
        }

        return null;
    }

    public async Task<Game> Create(Game game)
    {
        game.Id = Guid.NewGuid()
                      .ToString();

        DataEntities.Game dataGame = DataEntities.Game.Map(game);
        ItemResponse<DataEntities.Game> itemResponse = await _container.CreateItemAsync(dataGame);

        DataEntities.Game? savedGame = itemResponse.Resource;
        return savedGame.Map();
    }

    public async Task<Board> AddBoardToGame(string gameId, Board board)
    {
        board.Id = Guid.NewGuid();

        var patchOperations = new List<PatchOperation>();
        patchOperations.Add(PatchOperation.Add("/boards", board));

        await _container.PatchItemAsync<DataEntities.Game>(gameId, new PartitionKey("/owner/id"), patchOperations);
        return board;
    }

    private Entities.Game MapGame(DataEntities.Game dataGame, string userId)
    {
        Game game = dataGame.Map();
        if (dataGame?.Owner?.Id == userId)
            game.IsGameMaster = true;

        return game;
    }
}