using Microsoft.AspNetCore.Mvc;
using TableTop.Entities.Authorization;
using TableTop.Entities.Extension;
using TableTop.Entities.People;
using TableTop.Service;

namespace TableTop.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
    private readonly ITokenService _tokenService;

    public TokenController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpGet("token")]
    public async Task<ActionResult<StorageToken>> GetToken()
    {
        User? user = User.GetUser();
        if (user == null)
            return Forbid();

        StorageToken token = _tokenService.GetStorageToken(user);

        return Ok(token);
    }
}