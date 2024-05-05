using ItemRental.Application.RentListings;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly IJwtTokenService _jwtTokenService;
        public ListingsController(ISender sender, IJwtTokenService jwtTokenService)
        {
            _sender = sender;
            _jwtTokenService = jwtTokenService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(string? searchArgument, string? category, bool? ownerListings, int? page)
        {
            ///Guid? userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<PaginatedResult<List<RentListingDTO>>> result = await _sender.Send(new GetRentListingsQuery(searchArgument, category, ownerListings, null, page));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("{id}")]
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

            Result<List<RentListingDTO>> result = await _sender.Send(new GetRentListingByOwnerQuery(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost]
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
        [HttpPost("{id}/Update")]
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
        [HttpDelete("{id}")]
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

        [HttpGet("{id}/BusyDates")]
        public async Task<IActionResult> GetBusyDates(Guid id)
        {
            Result<List<OrderDateDTO>> result = await _sender.Send(new GetRentListingBusyDatesQuery(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [HttpGet("{id}/Comments")]
        public async Task<IActionResult> GetComments(Guid id)
        {
            Result<List<CommentDTO>> result = await _sender.Send(new GetCommentsQuery(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/Comments")]
        public async Task<IActionResult> CreateComment(Guid id, [FromBody] string text)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<Guid> result = await _sender.Send(new CreateCommentCommand(id, userId, text));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("{id}/Comments")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new DeleteCommentCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok();
        }
    }
}
