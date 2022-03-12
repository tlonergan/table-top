using TableTop.Entities;

namespace TableTop.Service;

public interface IGameService
{
    Task<Game?> Get(Guid id);
    Task<Game> Create(Game game);
}