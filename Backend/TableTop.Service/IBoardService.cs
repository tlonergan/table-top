using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Service;

public interface IBoardService
{
    Task<Board> Create(string gameId, Board board, User user);
    Task<List<Board>> GetAll(string gameId, User user);
    Task<Board?> Get(string gameId, Guid boardId, User user);
    Task SaveMapToken(MapToken mapToken, User user);
    Task DeleteMapToken(MapToken mapToken, User user);
    Task<Board?> Save(string gameId, Board board, User user);
}