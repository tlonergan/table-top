using TableTop.Entities.Authorization;
using TableTop.Entities.People;

namespace TableTop.Service;

public interface ITokenService
{
    StorageToken GetStorageToken(User user);
}