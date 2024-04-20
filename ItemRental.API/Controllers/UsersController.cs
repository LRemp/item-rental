using ItemRental.Application.Orders;
using ItemRental.Application.RentListings;
using ItemRental.Application.Users;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        private readonly ISender _sender;
        private readonly IJwtTokenService _jwtTokenService;
        public UsersController(ISender sender, IJwtTokenService jwtTokenService)
        {
            _sender = sender;
            _jwtTokenService = jwtTokenService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            Result<LoginResponse> result = await _sender.Send(new LoginCommand(request.Email, request.Password));

            if(result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return Ok(result.Value);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            Result<UserResponse> result = await _sender.Send(new GetUserByIdQuery(id));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand request)
        {
            Result<Guid> result = await _sender.Send(request);

            if(result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("Notifications")]
        public async Task<IActionResult> GetNotifications()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<NotificationDTO>> result = await _sender.Send(new GetUserNotificationsQuery(userId));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}/Orders")]
        public async Task<IActionResult> GetOrders(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> result = await _sender.Send(new GetOrdersFromMerchantQuery(userId, id));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}/Listings")]
        public async Task<IActionResult> GetListings(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<RentListingDTO>> result = await _sender.Send(new GetRentListingByOwnerQuery(id));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }
    }
}
