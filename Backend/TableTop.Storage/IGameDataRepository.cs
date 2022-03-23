using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage
{
    public interface IGameDataRepository
    {
        Task<Game?> Get(string id, User user);
        Task<Game?> Get(string gameId);
        Task<List<Game>> GetAll(User user);
        Task<Game> Create(Game game);
        Task<Board> SaveBoard(string gameId, Board board, User user);
        Task SaveMapToken(MapToken mapToken, User user);
        Task DeleteMapToken(MapToken mapToken, User user);
        Task AddPlayer(string gameId, User player, User gameOwner);
    }
}