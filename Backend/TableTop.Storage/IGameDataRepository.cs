using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage
{
    public interface IGameDataRepository
    {
        Task<Game?> Get(string id);
        Task<List<Game>> GetAll(User user);
        Task<Game> Create(Game game);
    }
}