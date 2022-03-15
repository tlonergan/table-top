using Microsoft.AspNetCore.Authorization;

namespace TableTop.Authorization;

public class HasScopeRequirement : IAuthorizationRequirement
{
    public HasScopeRequirement(string issuer, string scope)
    {
        Issuer = issuer;
        Scope = scope;
    }

    public string Issuer { get; }
    public string Scope { get; }
}