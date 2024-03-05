using ItemRental.Core.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ISender _sender;
        public ItemsController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create")]
        public void Create([FromBody] ItemDTO item)
        {
            var usercontext = HttpContext.User;
            var value = usercontext.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            var claims = HttpContext.User.Identity as ClaimsIdentity;
            Console.WriteLine(usercontext.FindFirst(ClaimTypes.Name)?.Value);
        }
    }
}
