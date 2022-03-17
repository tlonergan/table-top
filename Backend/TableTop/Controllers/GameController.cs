using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;
using TableTop.Entities.Authorization;
using TableTop.Entities.People;
using TableTop.Service;

namespace TableTop.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost]
        [Authorize(AuthorizationScopes.WriteGames)]
        public async Task<ActionResult<Game>> Post(Game game)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            game.Owner = new UserIdentity(userIdentity).User;

            Game createdGame = await _gameService.Create(game);
            return Ok(createdGame);
        }

        [HttpGet("{Id}")]
        [Authorize(AuthorizationScopes.ReadGames)]
        public async Task<ActionResult<Game>> Get(string id)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            User user = new UserIdentity(userIdentity).User;

            Game? game = await _gameService.Get(id, user);
            if (game == null)
                return NotFound("No game with that ID.");

            return Ok(game);
        }

        [HttpGet]
        [Authorize(AuthorizationScopes.ReadGames)]
        public async Task<ActionResult<List<Game>>> GetAll()
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            User user = new UserIdentity(userIdentity).User;

            List<Game> games = await _gameService.GetAll(user);
            return Ok(games);
        }
    }
}