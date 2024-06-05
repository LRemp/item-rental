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
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            Result<LoginResponse> result = await _sender.Send(new LoginCommand(request.Email, request.Password));

            if(result.IsFailure)
            {
                return BadRequest(result.Error);
            }

            return Ok(result.Value);
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetById(string username)
        {
            Result<UserDTO> result = await _sender.Send(new GetUserByUsernameQuery(username));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO registerUserDTO)
        {

            Result<Guid> result = await _sender.Send(new RegisterCommand(registerUserDTO));

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

        [HttpGet("{id}/Listings")]
        public async Task<IActionResult> GetListings(Guid id)
        {

            Result<List<RentListingDTO>> result = await _sender.Send(new GetRentListingByOwnerQuery(id));

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(Roles = "Administrator")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("VerificationRequests")]
        public async Task<IActionResult> GetVerificationRequests()
        {
            Result<List<VerificationRequestDTO>> result = await _sender.Send(new GetVerificationRequestsQuery());

            if(result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("Profile/Verification")]
        public async Task<IActionResult> GetVerificationRequest()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<VerificationRequestDTO> result = await _sender.Send(new GetVerificationRequestQuery(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("Profile/Verification")]
        public async Task<IActionResult> CreateVerificationRequest()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new CreateVerificationRequestCommand(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }

        [Authorize(Roles = "Administrator")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("VerificationRequests/{id}/Approve")]
        public async Task<IActionResult> ApproveVerificationRequest(Guid id)
        {
            Result result = await _sender.Send(new ApproveVerificationRequestCommand(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }

        [Authorize(Roles = "Administrator")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("VerificationRequests/{id}/Reject")]
        public async Task<IActionResult> RejectVerificationRequest(Guid id)
        {
            Result result = await _sender.Send(new RejectVerificationRequestCommand(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }
    }
}
