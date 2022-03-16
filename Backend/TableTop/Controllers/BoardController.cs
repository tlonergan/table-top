using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;
using TableTop.Entities.Authorization;
using TableTop.Entities.People;
using TableTop.Service;

namespace TableTop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;

        public BoardController(IBoardService boardService)
        {
            _boardService = boardService;
        }

        [HttpPost("/game/{gameId}/board")]
        [Authorize(AuthorizationScopes.ReadBoards)]
        public async Task<ActionResult<List<Board>>> GetAll(string gameId)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            User user = new UserIdentity(userIdentity).User;

            List<Board> boards = await _boardService.GetAll(gameId, user);
            return Ok(boards);
        }

        [HttpPost("/game/{gameId}/board")]
        [Authorize(AuthorizationScopes.WriteBoards)]
        public async Task<ActionResult<Board>> Post(string gameId, Board board)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            Board createdBoard = await _boardService.CreateBoard(gameId, board);
            return Ok(createdBoard);
        }
    }
}