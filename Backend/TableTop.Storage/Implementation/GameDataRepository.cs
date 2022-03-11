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
        ContainerResponse? containerResponse = database.CreateContainerIfNotExistsAsync(ContainerName, $"/{nameof(Game.Name)}")
                                                       .Result;

        _container = containerResponse.Container;
    }

    public async Task<List<Game>> Get(User user)
    {
        List<Game> results = new();

        using FeedIterator<Game>? feedIterator = _container.GetItemLinqQueryable<Game>()
                                                           .Where(g => g.Owner.Username == user.Username)
                                                           .ToFeedIterator();

        foreach (Game game in await feedIterator.ReadNextAsync())
        {
            results.Add(game);
        }

        return results;
    }
}