using System.Security.Principal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;
using TableTop.Entities.Authorization;
using TableTop.Entities.People;
using TableTop.Service;

namespace TableTop.Controllers
{
    [Route("api/game")]
    [ApiController]
    [Authorize]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;

        public BoardController(IBoardService boardService)
        {
            _boardService = boardService;
        }

        [HttpGet("{gameId}/board")]
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

        [HttpGet("{gameId}/board/{boardId}")]
        [Authorize(AuthorizationScopes.ReadBoards)]
        public async Task<ActionResult<Board>> Get(string gameId, Guid boardId)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            User user = new UserIdentity(userIdentity).User;
            Board? board = await _boardService.Get(gameId, boardId, user);
            return Ok(board);
        }

        [HttpPost("{gameId}/board")]
        [Authorize(AuthorizationScopes.WriteBoards)]
        public async Task<ActionResult<Board>> Post(string gameId, Board board)
        {
            IIdentity? userIdentity = User.Identity;
            if (userIdentity == null)
                return Forbid();

            User user = new UserIdentity(userIdentity).User;

            Board createdBoard = await _boardService.CreateBoard(gameId, board, user);
            return Ok(createdBoard);
        }
    }
}