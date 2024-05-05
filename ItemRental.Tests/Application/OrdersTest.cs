using FluentAssertions;
using ItemRental.Application.Orders;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Core.Helpers;
using Moq;

namespace ItemRental.Tests.Application
{
    public class OrdersTest
    {
        private readonly Mock<IOrderRepository> orderRepository;
        private readonly Mock<IOrderService> orderService;
        private readonly Mock<IUserRepository> userRepository;
        public OrdersTest()
        {
            this.orderRepository = new Mock<IOrderRepository>();
            this.orderService = new Mock<IOrderService>();
            this.userRepository = new Mock<IUserRepository>();
        }

        [Fact]
        public async Task AddOrderCommandHandlerReturnsSuccess()
        {
            // Arrange
            var user = Guid.NewGuid();
            var addOrderDTO = new AddOrderDTO
            {
                RentListing = Guid.NewGuid(),
                StartDate = DateTime.Now,
                EndDate = DateTime.Now.AddDays(1)
            };
            var addOrderCommand = new AddOrderCommand(user, addOrderDTO);
            var addOrderCommandHandler = new AddOrderCommandHandler(orderService.Object);

            orderService.Setup(x => x.CreateAsync(addOrderDTO, user, It.IsAny<CancellationToken>()))
                .ReturnsAsync(Result<Guid>.Success(Guid.NewGuid()));

            // Act
            var result = addOrderCommandHandler.Handle(addOrderCommand, CancellationToken.None).Result;

            // Assert
            orderService.Verify(x => x.CreateAsync(addOrderDTO, user, It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Should().BeOfType<Result<Guid>>();
        }

        [Fact]
        public async Task GetOrderQueryHandlerReturnsFailureResult()
        {
            orderService.Setup(x => x.GetAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((OrderDTO)null);

            var query = new GetOrderQuery(Guid.NewGuid());

            var handler = new GetOrderQueryHandler(orderService.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            orderService.Verify(x => x.GetAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsFailure.Should().BeTrue();
        }

        [Fact]
        public async Task GetOrderQueryHandlerReturnsSuccessResult()
        {
            Mock<OrderDTO> orderDTO = new Mock<OrderDTO>();

            orderService.Setup(x => x.GetAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(orderDTO.Object);

            var query = new GetOrderQuery(Guid.NewGuid());

            var handler = new GetOrderQueryHandler(orderService.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            orderService.Verify(x => x.GetAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().Be(orderDTO.Object);
        }

        [Fact]
        public async Task AcceptOrderCommandHandlerReturnsSuccessResult()
        {
            // Arrange
            var orderId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var acceptOrderCommand = new AcceptOrderCommand(orderId, userId);
            var acceptOrderCommandHandler = new AcceptOrderCommandHandler(orderService.Object);

            orderService.Setup(x => x.AcceptAsync(orderId, userId, It.IsAny<CancellationToken>()))
                .ReturnsAsync(Result.Success());

            // Act
            var result = await acceptOrderCommandHandler.Handle(acceptOrderCommand, CancellationToken.None);

            // Assert
            orderService.Verify(x => x.AcceptAsync(orderId, userId, It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task GetOrdersFromMerchantQueryHandlerReturnsFailureResult()
        {
            userRepository.Setup(x => x.GetByIdAsync(It.IsAny<Guid>(), default)).ReturnsAsync((User)null);

            var query = new GetOrdersFromMerchantQuery(Guid.NewGuid(), Guid.NewGuid());

            var handler = new GetOrdersFromMerchantQueryHandler(orderRepository.Object, userRepository.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            userRepository.Verify(x => x.GetByIdAsync(It.IsAny<Guid>(), default), Times.Once);
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.NotFound);
        }

        [Fact]
        public async Task GetOrdersFromMerchantQueryHandlerReturnsSuccessResult()
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = "test",
                Email = "test@itemrental.com",
                Name = "Test",
                Surname = "User"
            };

            var order = new Mock<OrderDTO>();

            var orders = new List<OrderDTO> { order.Object };

            userRepository.Setup(x => x.GetByIdAsync(It.IsAny<Guid>(), default)).ReturnsAsync(user);
            orderRepository.Setup(x => x.GetOrdersFromMerchantAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(orders);

            var query = new GetOrdersFromMerchantQuery(Guid.NewGuid(), Guid.NewGuid());

            var handler = new GetOrdersFromMerchantQueryHandler(orderRepository.Object, userRepository.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            userRepository.Verify(x => x.GetByIdAsync(It.IsAny<Guid>(), default), Times.Once);
            orderRepository.Verify(x => x.GetOrdersFromMerchantAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeNull();
        }

        [Fact]
        public async Task GetOwnerOrdersQueryReturnsSuccessfulResult()
        {
            orderRepository.Setup(x => x.GetOwnerOrdersAsync(It.IsAny<Guid>(), It.IsAny<OrderStatus?>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<OrderDTO>());

            var query = new GetOwnerOrdersQuery(Guid.NewGuid(), OrderStatus.Accepted);

            var handler = new GetOwnerOrdersQueryHandler(orderRepository.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            orderRepository.Verify(x => x.GetOwnerOrdersAsync(It.IsAny<Guid>(), It.IsAny<OrderStatus?>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task GetOrdersQueryHandlerReturnsSuccessfulResult()
        {
            orderRepository.Setup(x => x.GetUserAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<OrderDTO>());

            var query = new GetOrdersQuery(Guid.NewGuid());

            var handler = new GetOrdersQueryHandler(orderRepository.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            orderRepository.Verify(x => x.GetUserAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task GetListingUserOrdersQueryHandler()
        {
            orderRepository.Setup(x => x.GetUserListingOrdersAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<OrderDTO>());

            var query = new GetListingUserOrdersQuery(Guid.NewGuid(), Guid.NewGuid());

            var handler = new GetListingUserOrdersQueryHandler(orderRepository.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            orderRepository.Verify(x => x.GetUserListingOrdersAsync(It.IsAny<Guid>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }
    }
}
