using ItemRental.Application.Items;
using ItemRental.Application.Users;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly IJwtTokenService _jwtTokenService;
        public ItemsController(ISender sender, IJwtTokenService jwtTokenService)
        {
            _sender = sender;
            _jwtTokenService = jwtTokenService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost()]
        public async Task<IActionResult> Create([FromBody] AddItemDTO item)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);
            
            Result<Guid> result = await _sender.Send(new AddItemCommand(userId, item));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Result<ItemDTO> result = await _sender.Send(new GetItemByIdQuery(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<ItemDTO>> result = await _sender.Send(new GetItemsQuery(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}")]
        public async Task<IActionResult> Update([FromBody] ItemDTO item, Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new UpdateItemCommand(item, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new DeleteItemCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }

        [HttpGet("Categories")]
        public async Task<IActionResult> GetCategories()
        {
            Result<List<CategoryDTO>> result = await _sender.Send(new GetCategoriesQuery());

            Thread.Sleep(100);
            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }
    }
}
