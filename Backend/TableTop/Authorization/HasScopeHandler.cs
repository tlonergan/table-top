using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace TableTop.Authorization;

public class HasScopeHandler : AuthorizationHandler<HasScopeRequirement>
{
    private static readonly string Scope = "scope";

    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, HasScopeRequirement requirement)
    {
        string requirementIssuer = requirement.Issuer;

        if (!context.User.HasClaim(c => c.Type == Scope && c.Issuer == requirementIssuer))
            return Task.CompletedTask;

        ClaimsPrincipal user = context.User;

        string[]? scopes = user.FindFirst(c => c.Type == Scope && c.Issuer == requirementIssuer)
                              ?.Value.Split(' ');

        if (scopes != null && scopes.Any(s => s == requirement.Scope))
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}