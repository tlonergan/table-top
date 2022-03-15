using System.Security.Principal;
using TableTop.Entities;
using TableTop.Entities.Authorization;

namespace TableTop.Service;

public interface IGameService
{
    Task<Game?> Get(string id);
    Task<Game> Create(Game game);
    Task<List<Game>> GetAll(UserIdentity userIdentity);
}