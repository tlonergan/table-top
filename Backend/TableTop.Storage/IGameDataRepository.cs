using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Storage
{
    public interface IGameDataRepository
    {
        Task<Game?> Get(string id, User user);
        Task<List<Game>> GetAll(User user);
        Task<Game> Create(Game game);
        Task<Board> AddBoardToGame(string gameId, Board board, User user);
        Task SaveMapToken(MapToken mapToken, User user);
        Task DeleteMapToken(MapToken mapToken, User user);
    }
}