using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TableTop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        [HttpGet]
        public void Get()
        {
        }
    }
}
