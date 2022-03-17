using TableTop.Entities;
using TableTop.Entities.People;

namespace TableTop.Service;

public interface IBoardService
{
    Task<Board> CreateBoard(string gameId, Board board, User user);
    Task<List<Board>> GetAll(string gameId, User user);
}