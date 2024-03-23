using ItemRental.Application.RentListings;
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
    public class RentListingsController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly IJwtTokenService _jwtTokenService;
        public RentListingsController(ISender sender, IJwtTokenService jwtTokenService)
        {
            _sender = sender;
            _jwtTokenService = jwtTokenService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        {
            Result<GetRentListingsResponse> result = await _sender.Send(new GetRentListingsQuery());

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            Result<RentListingDTO> result = await _sender.Send(new GetRentListingByIdQuery(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("getByOwner")]
        public async Task<IActionResult> GetByOwner()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<GetRentListingByOwnerResponse> result = await _sender.Send(new GetRentListingByOwnerQuery(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AddRentListingDTO addRentListingDTO)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<Guid> result = await _sender.Send(new AddRentListingCommand(addRentListingDTO, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("update/{id}")]
        public async Task<IActionResult> Update([FromBody] UpdateRentListingDTO updateRentListingDTO)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new UpdateRentListingCommand(updateRentListingDTO, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new DeleteRentListingCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }
    }
}
