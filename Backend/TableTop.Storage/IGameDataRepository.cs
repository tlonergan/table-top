using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage
{
    public interface IGameDataRepository
    {
        Task<Game?> Get(Guid id);
        Task<List<Game>> GetAll(User user);
        Task Create(Game game);
    }
}