using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json;
using TableTop.Entities.People;

namespace TableTop.Entities.Authorization;

public class UserIdentity
{
    public UserIdentity(IIdentity? identity)
    {
        if (identity is not ClaimsIdentity claimsIdentity)
            throw new ArgumentException("Identity must be a claims identity.", nameof(identity));

        Claim? userClaim = claimsIdentity.Claims.FirstOrDefault(c => c.Type == "https://table-top-map.azurewebsites.net/user");
        if (userClaim == null || string.IsNullOrWhiteSpace(userClaim.Value))
            throw new ArgumentException("Identity does not contain the user claim.", nameof(identity));

        RawUser? user = JsonSerializer.Deserialize<RawUser>(userClaim.Value, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        if (user == null)
            throw new ArgumentException("Identity does not contain a valid user claim.", nameof(identity));

        User = user.Map();
    }

    public User User { get; }

    private class RawUser
    {
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public User Map()
        {
            return new User
            {
                Username = Username,
                Id = UserId,
                Person = new Person { Email = Email, FirstName = Name }
            };
        }
    }
}