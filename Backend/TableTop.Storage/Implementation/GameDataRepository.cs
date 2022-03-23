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
                                                                        .Where(g => g.Owner.Id == userId
                                                                                    || g.Players[userId]
                                                                                        .IsDefined())
                                                                        .ToFeedIterator();

        foreach (DataEntities.Game dataGame in await feedIterator.ReadNextAsync())
        {
            Game game = MapGame(dataGame, userId);
            results.Add(game);
        }

        return results;
    }

    public async Task<Game?> Get(string id, User user)
    {
        string userId = user.Id;
        using FeedIterator<DataEntities.Game>? feedIterator = _container.GetItemLinqQueryable<DataEntities.Game>()
                                                                        .Where(g => g.Id == id
                                                                                    && (g.Owner.Id == userId
                                                                                        || g.Players[userId]
                                                                                            .IsDefined()))
                                                                        .ToFeedIterator();

        foreach (DataEntities.Game? game in await feedIterator.ReadNextAsync())
        {
            return MapGame(game, userId);
        }

        return null;
    }

    public async Task<Game?> Get(string gameId)
    {
        using FeedIterator<DataEntities.Game>? feedIterator = _container.GetItemLinqQueryable<DataEntities.Game>()
                                                                        .Where(g => g.Id == gameId)
                                                                        .ToFeedIterator();

        foreach (DataEntities.Game? game in await feedIterator.ReadNextAsync())
        {
            return MapGame(game, string.Empty);
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

    public async Task<Game> Update(Game game, User user)
    {
        string gameName = game.Name;
        if (string.IsNullOrWhiteSpace(gameName))
            game.Name = gameName = "Unnamed";

        List<PatchOperation> patchOperations = new() { PatchOperation.Set($"/name", gameName) };

        await _container.PatchItemAsync<DataEntities.Game>(game.Id, new PartitionKey(user.Id), patchOperations);
        return game;
    }

    public async Task<Board> SaveBoard(string gameId, Board board, User user)
    {
        if (board.Id == default)
            board.Id = Guid.NewGuid();

        List<PatchOperation> patchOperations = new() { PatchOperation.Set($"/boards/{board.Id}", DataEntities.Board.Map(board)) };

        await _container.PatchItemAsync<DataEntities.Game>(gameId, new PartitionKey(user.Id), patchOperations);
        return board;
    }

    public async Task SaveMapToken(MapToken mapToken, User user)
    {
        if (mapToken.MapTokenId == default)
            mapToken.MapTokenId = Guid.NewGuid();

        DataEntities.MapToken dataMapToken = DataEntities.MapToken.Map(mapToken);

        List<PatchOperation> patchOperations = new List<PatchOperation>();
        patchOperations.Add(PatchOperation.Add($"/boards/{mapToken.BoardId}/mapTokens/{mapToken.MapTokenId}", dataMapToken));

        await _container.PatchItemAsync<DataEntities.Game>(mapToken.Game.Id, new PartitionKey(user.Id), patchOperations);
    }

    public async Task DeleteMapToken(MapToken mapToken, User user)
    {
        if (mapToken.MapTokenId == default)
            throw new Exception("Map Token needs an ID");

        List<PatchOperation> patchOperations = new List<PatchOperation>();
        patchOperations.Add(PatchOperation.Remove($"/boards/{mapToken.BoardId}/mapTokens/{mapToken.MapTokenId}"));

        await _container.PatchItemAsync<DataEntities.Game>(mapToken.Game.Id, new PartitionKey(user.Id), patchOperations);
    }

    public async Task AddPlayer(string gameId, User player, User gameOwner)
    {
        List<PatchOperation> patchOperations = new List<PatchOperation>();
        patchOperations.Add(PatchOperation.Set($"/players/{player.Id}", player));

        await _container.PatchItemAsync<DataEntities.Game>(gameId, new PartitionKey(gameOwner.Id), patchOperations);
    }

    private Game MapGame(DataEntities.Game dataGame, string userId)
    {
        Game game = dataGame.Map();
        if (dataGame?.Owner?.Id == userId)
            game.IsGameMaster = true;

        return game;
    }
}