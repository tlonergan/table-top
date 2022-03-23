using System.Security.Claims;
using System.Security.Principal;
using TableTop.Entities.Authorization;
using TableTop.Entities.People;

namespace TableTop.Entities.Extension;

public static class IIdentityExtensions
{
    public static User? GetUser(this ClaimsPrincipal claimsPrincipal)
    {
        IIdentity? userIdentity = claimsPrincipal.Identity;
        if (userIdentity == null)
            return null;

        User user = new UserIdentity(userIdentity).User;
        return user;
    }
}