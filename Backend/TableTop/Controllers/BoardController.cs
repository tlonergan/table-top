using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TableTop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BoardController : ControllerBase
    {
        [HttpGet]
        public void Get()
        {
        }
    }
}