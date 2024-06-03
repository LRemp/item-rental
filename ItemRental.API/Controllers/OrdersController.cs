using ItemRental.Application.Delivery;
using ItemRental.Application.Orders;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ItemRental.API.Controllers
{
    [Route("api/[controller]")]
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

            Result<string> result = await _sender.Send(new AddOrderCommand(userId, request));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(new { id = result.Value });
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
        public async Task<IActionResult> Get(string id)
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
        public async Task<IActionResult> Accept(string id)
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
        [HttpGet("Owner")]
        public async Task<IActionResult> GetPendingOrders([FromQuery(Name = "status")] OrderStatus? status)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<OrderDTO>> result = await _sender.Send(new GetOwnerOrdersQuery(userId, status));

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
        public async Task<IActionResult> GetDeliveryData(string id, [FromQuery(Name = "role")] OrderRole? role)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<DeliveryDTO?> result = await _sender.Send(new GetDeliveryQuery(id, userId, role));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            if (result.Value is null)
            {
                return NoContent();
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/Delivery")]
        public async Task<IActionResult> SetDeliveryData(string id, [FromBody] UpdateDeliveryDTO updateDeliveryDTO)
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
        public async Task<IActionResult> ConfirmDelivery(string id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new ConfirmDeliveryCommand(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}/Messages")]
        public async Task<IActionResult> GetMessages(string id)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result<List<MessageDTO>> result = await _sender.Send(new GetMessagesQuery(id, userId));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return Ok(result.Value);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("{id}/Messages")]
        public async Task<IActionResult> CreateMessage(string id, [FromBody] CreateMessageDTO message)
        {
            Guid userId = _jwtTokenService.GetTokenSubject(HttpContext.Request.Headers["Authorization"]);

            Result result = await _sender.Send(new CreateMessageCommand(id, userId, message.Text));

            if (result.IsFailure)
            {
                return NotFound(result.Error);
            }

            return NoContent();
        }
    }
}
