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

        using FeedIterator<Game>? feedIterator = _container.GetItemLinqQueryable<Game>()
                                                           .Where(g => g.Owner.Id == user.Id)
                                                           .ToFeedIterator();

        foreach (Game game in await feedIterator.ReadNextAsync())
        {
            results.Add(game);
        }

        return results;
    }

    public async Task<Game?> Get(string id)
    {
        using FeedIterator<Game>? feedIterator = _container.GetItemLinqQueryable<Game>()
                                                           .Where(g => g.Id == id)
                                                           .ToFeedIterator();


        foreach (Game? game in await feedIterator.ReadNextAsync())
        {
            return game;
        }

        return null;
    }

    public async Task<Game> Create(Game game)
    {
        game.Id = Guid.NewGuid()
                      .ToString();

        ItemResponse<Game> itemResponse = await _container.CreateItemAsync(game);
        return itemResponse.Resource;
    }
}