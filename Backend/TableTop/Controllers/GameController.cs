using Microsoft.AspNetCore.Mvc;
using TableTop.Entities;

namespace TableTop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpPost]
        public async Task Post(Game game)
        {
        }
    }
}