using Microsoft.Extensions.DependencyInjection;
using TableTop.Service.Implementation;

namespace TableTop.Service;

public static class ServiceRegistrar
{
    public static void Register(IServiceCollection services)
    {
        services.AddSingleton<IGameService, GameService>();
        services.AddSingleton<IBoardService, BoardService>();
    }
}