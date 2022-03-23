using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;
using TableTop.Entities.Authorization;
using TableTop.Entities.Extension;
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

        [HttpGet]
        [Authorize(AuthorizationScopes.ReadGames)]
        public async Task<ActionResult<List<Game>>> GetAll()
        {
            User? user = User.GetUser();
            if (user == null)
                return Forbid();

            List<Game> games = await _gameService.GetAll(user);
            return Ok(games);
        }

        [HttpPost]
        [Authorize(AuthorizationScopes.WriteGames)]
        public async Task<ActionResult<Game>> Post(Game game)
        {
            User? user = User.GetUser();
            if (user == null)
                return Forbid();

            Game createdGame = await _gameService.Create(game);
            return Ok(createdGame);
        }

        [HttpGet("{id}")]
        [Authorize(AuthorizationScopes.ReadGames)]
        public async Task<ActionResult<Game>> Get(string id)
        {
            User? user = User.GetUser();
            if (user == null)
                return Forbid();

            Game? game = await _gameService.Get(id, user);
            if (game == null)
                return NotFound("No game with that ID.");

            return Ok(game);
        }

        [HttpPut("{id}")]
        [Authorize(AuthorizationScopes.WriteGames)]
        public async Task<ActionResult<Game>> Put(string id, Game game)
        {
            User? user = User.GetUser();
            if (user == null)
                return Forbid();

            Game updatedGame = await _gameService.Update(game, user);
            return Ok(updatedGame);
        }

        [HttpPost("{id}/player")]
        [Authorize]
        public async Task<ActionResult> AddPlayer(string id)
        {
            User? user = User.GetUser();
            if (user == null)
                return Forbid();

            await _gameService.AddPlayer(id, user);
            return Ok();
        }
    }
}