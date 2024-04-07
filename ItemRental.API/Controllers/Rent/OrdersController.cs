using ItemRental.Application.Delivery;
using ItemRental.Application.Orders;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItemRental.API.Controllers.Rent
{
    [Route("api/Rent/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly IJwtTokenService _jwtTokenService;
        public OrdersController(ISender sender, IJwtTokenService jwtTokenService)
        {
            _sender = sender;
            _jwtTokenService = jwtTokenService;
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AddOrderDTO request)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<Guid> result = await _sender.Send(new AddOrderCommand(userId, request));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> result = await _sender.Send(new GetOrdersQuery(userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<OrderDTO> result = await _sender.Send(new GetOrderQuery(id));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/accept")]
        public async Task<IActionResult> Accept(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new AcceptOrderCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}/UserOrders")]
        public async Task<IActionResult> GetUserOrders(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> result = await _sender.Send(new GetListingUserOrdersQuery(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("Pending")]
        public async Task<IActionResult> GetPendingOrders(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> result = await _sender.Send(new GetOwnerOrdersQuery(userId, OrderStatus.Pending));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("InProgress")]
        public async Task<IActionResult> GetInProgressOrders(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> inProgressOrders = await _sender.Send(new GetOwnerOrdersQuery(userId, OrderStatus.InProgress));
            Result<List<OrderDTO>> acceptedOrders = await _sender.Send(new GetOwnerOrdersQuery(userId, OrderStatus.Accepted));
            List<OrderDTO> orderDTOs = [.. inProgressOrders.Value, .. acceptedOrders.Value];

            Result<List<OrderDTO>> result = Result.Success(orderDTOs);

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}/Delivery")]
        public async Task<IActionResult> GetDeliveryData(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<DeliveryDTO> result = await _sender.Send(new GetDeliveryQuery(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/Delivery")]
        public async Task<IActionResult> SetDeliveryData(Guid id, [FromBody] UpdateDeliveryDTO updateDeliveryDTO)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new UpdateDeliveryCommand(id, userId, updateDeliveryDTO));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/Delivery/Confirm")]
        public async Task<IActionResult> ConfirmDelivery(Guid id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new ConfirmDeliveryCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }
            
            return NoContent();
        }
    }
}
