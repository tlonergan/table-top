using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.DependencyInjection;
using TableTop.Entities.Configuration;
using TableTop.Storage.Implementation;

namespace TableTop.Storage
{
    public static class StorageRegistrar
    {
        public static void Register(IServiceCollection services)
        {
            services.AddSingleton<IGameDataRepository, GameDataRepository>();
            services.AddSingleton(serviceProvider =>
            {
                Settings settings = serviceProvider.GetRequiredService<Settings>();
                return new CosmosClient(settings.DOCUMENT_STORE_URL, settings.PRIMARY_KEY, new CosmosClientOptions { ApplicationName = "TableTop.MapsService" });
            });
        }
    }
}