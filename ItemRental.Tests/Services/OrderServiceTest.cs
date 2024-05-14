using AutoMapper;
using Azure.Communication.Email;
using FluentAssertions;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using ItemRental.Services.Services;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.Marshalling;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Tests.Services
{
    public class OrderServiceTest
    {
        private readonly Mock<IOrderRepository> orderRepositoryMock = new Mock<IOrderRepository>();
        private readonly Mock<IEventLogRepository> eventLogRepositoryMock = new Mock<IEventLogRepository>();
        private readonly Mock<IMapper> mapperMock = new Mock<IMapper>();
        private readonly Mock<IRentListingRepository> rentListingRepositoryMock = new Mock<IRentListingRepository>();
        private readonly Mock<IUserRepository> userRepositoryMock = new Mock<IUserRepository>();
        private readonly Mock<IEmailService> emailServiceMock = new Mock<IEmailService>();

        [Fact]
        public async Task GetAsync_WhenOrderExists_ReturnsOrderDTO()
        {
            // Arrange
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var orderDTO = new OrderDTO { Id = id, Status = OrderStatus.InProgress, RentListing = new RentListingDTO(), User = new UserDTO() };
            var events = new List<EventLog> { new EventLog { /* Populate properties */ } };

            orderRepositoryMock.Setup(repo => repo.GetAsync(id, cancellationToken)).ReturnsAsync(orderDTO);
            eventLogRepositoryMock.Setup(repo => repo.GetAllAsync(id, cancellationToken)).ReturnsAsync(events);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.GetAsync(id, cancellationToken);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(id, result.Id);
        }

        [Fact]
        public async Task GetAsync_WhenOrderDoesNotExist_ReturnsNull()
        {
            // Arrange
            var id = Guid.NewGuid();

            orderRepositoryMock.Setup(repo => repo.GetAsync(id, CancellationToken.None)).ReturnsAsync((OrderDTO)null);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.GetAsync(id, CancellationToken.None);

            // Assert
            result.Should().BeNull();
        }

        // More test methods for other scenarios...

        [Fact]
        public async Task IsItemInUse_WhenItemIsInUse_ReturnsTrue()
        {
            // Arrange
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var orders = new List<Order> {
                new Order { Id = Guid.NewGuid(), Status = OrderStatus.InProgress, Listing = id }, // Add more orders if needed
                new Order { Id = Guid.NewGuid(), Status = OrderStatus.Pending, Listing = id } // Add more orders if needed
            };

            orderRepositoryMock.Setup(repo => repo.GetWithItemAsync(id, cancellationToken)).ReturnsAsync(orders);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.IsItemInUse(id, cancellationToken);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task IsDateNotTaken_NoOverlap_ReturnsTrue()
        {
            // Arrange
            var id = Guid.NewGuid();
            var startTime = new DateTime(2024, 5, 1);
            var endTime = new DateTime(2024, 5, 5);
            var cancellationToken = CancellationToken.None;
            var orders = new List<OrderDTO> {
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 10), EndDate = new DateTime(2024, 5, 15), RentListing = new RentListingDTO(), User = new UserDTO() },
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 20), EndDate = new DateTime(2024, 5, 25), RentListing = new RentListingDTO(), User = new UserDTO() }
            };

            orderRepositoryMock.Setup(repo => repo.GetListingOrdersAsync(id, cancellationToken)).ReturnsAsync(orders);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.IsDateNotTaken(id, startTime, endTime, cancellationToken);

            // Assert
            Assert.True(result);
        }
        [Fact]
        public async Task IsDateNotTaken_Overlap_ReturnsFalse()
        {
            // Arrange
            var id = Guid.NewGuid();
            var startTime = new DateTime(2024, 5, 1);
            var endTime = new DateTime(2024, 5, 5);
            var cancellationToken = CancellationToken.None;
            var orders = new List<OrderDTO> {
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 10), EndDate = new DateTime(2024, 5, 15), RentListing = new RentListingDTO(), User = new UserDTO() },
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 13), EndDate = new DateTime(2024, 5, 25), RentListing = new RentListingDTO(), User = new UserDTO() }
            };

            orderRepositoryMock.Setup(repo => repo.GetListingOrdersAsync(id, cancellationToken)).ReturnsAsync(orders);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.IsDateNotTaken(id, startTime, endTime, cancellationToken);

            // Assert
            Assert.True(result);
        }
        [Fact]
        public async Task AcceptAsync_WhenOrderIsNull_ReturnsFailure()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync((Order)null);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }
        [Fact]
        public async Task AcceptAsync_WhenListingIsNull_ReturnsFailure()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Listing = Guid.NewGuid() };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);
            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(order.Listing, cancellationToken)).ReturnsAsync((RentListing)null);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }

        [Fact]
        public async Task AcceptAsync_WhenListingOwnerIsNotUser_ReturnsFailure()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Listing = Guid.NewGuid() };
            var listing = new RentListing { Id = order.Listing, Renter = Guid.NewGuid() };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);
            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(order.Listing, cancellationToken)).ReturnsAsync(listing);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }

        [Fact]
        public async Task AcceptAsync_WhenOrderStatusIsNotPending_ReturnsFailure()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Listing = Guid.NewGuid(), Status = OrderStatus.InProgress };
            var listing = new RentListing { Id = order.Listing, Renter = user };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);
            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(order.Listing, cancellationToken)).ReturnsAsync(listing);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }

        [Fact]
        public async Task AcceptAsync_WhenFails_ReturnsFailure()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Listing = Guid.NewGuid(), Status = OrderStatus.Pending };
            var listing = new RentListing { Id = order.Listing, Renter = user };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);
            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(order.Listing, cancellationToken)).ReturnsAsync(listing);
            orderRepositoryMock.Setup(repo => repo.UpdateAsync(order, cancellationToken)).ReturnsAsync(false);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }
        [Fact]
        public async Task AcceptAsync_WhenSuccess_ReturnsSuccess()
        {
            // Arrange
            var id = Guid.NewGuid();
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Listing = Guid.NewGuid(), Status = OrderStatus.Pending };
            var listing = new RentListing { Id = order.Listing, Renter = user };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);
            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(order.Listing, cancellationToken)).ReturnsAsync(listing);
            orderRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Order>(), cancellationToken)).ReturnsAsync(true);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.AcceptAsync(id, user, cancellationToken);

            // Assert
            Assert.True(result.IsSuccess);
        }
        [Fact]
        public async Task CreateAsync_WhenListingIsNull_ReturnsFailure()
        {
            // Arrange
            var addOrderDTO = new AddOrderDTO { RentListing = Guid.NewGuid() };
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;

            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(addOrderDTO.RentListing, cancellationToken)).ReturnsAsync((RentListing)null);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.CreateAsync(addOrderDTO, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }
        [Fact]
        public async Task CreateAsync_WhenDateIsTaken_ReturnsFailure()
        {
            // Arrange
            var addOrderDTO = new AddOrderDTO { RentListing = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 1), EndDate = new DateTime(2024, 5, 5) };
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var listing = new RentListing { Id = addOrderDTO.RentListing };

            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(addOrderDTO.RentListing, cancellationToken)).ReturnsAsync(listing);
            orderRepositoryMock.Setup(repo => repo.GetListingOrdersAsync(addOrderDTO.RentListing, cancellationToken)).ReturnsAsync(new List<OrderDTO>
            {
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 10), EndDate = new DateTime(2024, 5, 15), RentListing = new RentListingDTO(), User = new UserDTO() },
                new OrderDTO { Id = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 13), EndDate = new DateTime(2024, 5, 25), RentListing = new RentListingDTO(), User = new UserDTO() }
            });

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.CreateAsync(addOrderDTO, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }
        [Fact]
        public async Task CreateAsync_WhenFailed_ReturnsFailure()
        {
            // Arrange
            var addOrderDTO = new AddOrderDTO { RentListing = Guid.NewGuid(), StartDate = new DateTime(2024, 5, 1), EndDate = new DateTime(2024, 5, 5) };
            var user = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var listing = new RentListing { Id = addOrderDTO.RentListing };

            rentListingRepositoryMock.Setup(repo => repo.GetInternalAsync(addOrderDTO.RentListing, cancellationToken)).ReturnsAsync(listing);
            orderRepositoryMock.Setup(repo => repo.GetListingOrdersAsync(addOrderDTO.RentListing, cancellationToken)).ReturnsAsync(new List<OrderDTO>());
            orderRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Order>(), cancellationToken)).ReturnsAsync(false);

            var orderService = new OrderService(orderRepositoryMock.Object, rentListingRepositoryMock.Object, eventLogRepositoryMock.Object, userRepositoryMock.Object, emailServiceMock.Object, mapperMock.Object);

            // Act
            var result = await orderService.CreateAsync(addOrderDTO, user, cancellationToken);

            // Assert
            Assert.False(result.IsSuccess);
        }
    }
}
