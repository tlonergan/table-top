using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;
using TableTop.Service;

namespace TableTop.Controllers
{
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
        public async Task<ActionResult<Game>> Post(Game game)
        {
            var createdGame = await _gameService.Create(game);
            return Ok(createdGame);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> Get(Guid id)
        {
            Game? game = await _gameService.Get(id);
            if (game == null)
                return NotFound("No game with that ID.");

            return Ok(game);
        }
    }
}