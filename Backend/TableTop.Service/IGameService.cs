using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Service;

public interface IGameService
{
    Task<Game?> Get(string id, User userIdentity);
    Task<Game> Create(Game game);
    Task<List<Game>> GetAll(User userIdentity);
    Task AddPlayer(string gameId, User player);
    Task<Game> Update(Game game, User user);
}