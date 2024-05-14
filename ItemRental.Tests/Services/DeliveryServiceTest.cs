using Xunit;
using Moq;
using System;
using System.Threading;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Enums;
using AutoMapper;
using System.Threading.Tasks;
using ItemRental.Services.Services;
using ItemRental.Repositories.Repositories;

namespace ItemRental.Test.Services
{
    public class DeliveryServiceTests
    {
        private readonly Mock<IDeliveryRepository> deliveryRepositoryMock = new Mock<IDeliveryRepository>();
        private readonly Mock<IOrderRepository> orderRepositoryMock = new Mock<IOrderRepository>();
        private readonly Mock<IEventLogRepository> eventLogRepositoryMock = new Mock<IEventLogRepository>();
        private readonly Mock<IUserRepository> userRepositoryMock = new Mock<IUserRepository>();
        private readonly Mock<IMapper> mapperMock = new Mock<IMapper>();
        [Fact]
        public async Task AddAsync_Throws_NotImplementedException()
        {
            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);
            var delivery = new Delivery();

            // Act & Assert
            await Assert.ThrowsAsync<NotImplementedException>(() => deliveryService.AddAsync(delivery, CancellationToken.None));
        }

        [Fact]
        public async Task CompleteDeliveryAsync_WhenOrderStatusIsDelivering_CompletesDeliverySuccessfully()
        {

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            var orderId = Guid.NewGuid();
            var order = new Order { Id = orderId, Status = OrderStatus.Delivering };
            var delivery = new Delivery { Id = Guid.NewGuid() };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, It.IsAny<CancellationToken>())).ReturnsAsync(order);
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(orderId, OrderRole.Merchant, It.IsAny<CancellationToken>())).ReturnsAsync(delivery);
            deliveryRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Delivery>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            orderRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Order>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            eventLogRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<EventLog>(), It.IsAny<CancellationToken>()));

            // Act
            var result = await deliveryService.CompleteDeliveryAsync(orderId, CancellationToken.None);

            // Assert
            Assert.True(result);
            orderRepositoryMock.Verify(repo => repo.UpdateAsync(order, It.IsAny<CancellationToken>()), Times.Once);
            deliveryRepositoryMock.Verify(repo => repo.UpdateAsync(delivery, It.IsAny<CancellationToken>()), Times.Once);
            eventLogRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<EventLog>(), It.IsAny<CancellationToken>()), Times.Once);
        }
        [Fact]
        public async Task CompleteDeliveryAsync_WhenOrderStatusIsReturning_CompletesDeliverySuccessfully()
        {

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            var orderId = Guid.NewGuid();
            var order = new Order { Id = orderId, Status = OrderStatus.Returning };
            var delivery = new Delivery { Id = Guid.NewGuid() };

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, It.IsAny<CancellationToken>())).ReturnsAsync(order);
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(orderId, OrderRole.Customer, It.IsAny<CancellationToken>())).ReturnsAsync(delivery);
            deliveryRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Delivery>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            orderRepositoryMock.Setup(repo => repo.UpdateAsync(It.IsAny<Order>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            eventLogRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<EventLog>(), It.IsAny<CancellationToken>()));

            // Act
            var result = await deliveryService.CompleteDeliveryAsync(orderId, CancellationToken.None);

            // Assert
            Assert.True(result);
            orderRepositoryMock.Verify(repo => repo.UpdateAsync(order, It.IsAny<CancellationToken>()), Times.Once);
            deliveryRepositoryMock.Verify(repo => repo.UpdateAsync(delivery, It.IsAny<CancellationToken>()), Times.Once);
            eventLogRepositoryMock.Verify(repo => repo.AddAsync(It.IsAny<EventLog>(), It.IsAny<CancellationToken>()), Times.Exactly(2));
        }

        [Fact]
        public async Task DeleteAsync_DeletesDeliverySuccessfully()
        {
            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            var deliveryId = Guid.NewGuid();
            deliveryRepositoryMock.Setup(repo => repo.DeleteAsync(deliveryId, It.IsAny<CancellationToken>())).ReturnsAsync(true);

            // Act
            var result = await deliveryService.DeleteAsync(deliveryId, CancellationToken.None);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task GetAsync_ReturnsDeliveryDTO()
        {
            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            var deliveryId = Guid.NewGuid();
            var delivery = new Delivery { Id = deliveryId };
            var deliveryDto = new DeliveryDTO();

            deliveryRepositoryMock.Setup(repo => repo.GetAsync(deliveryId, It.IsAny<CancellationToken>())).ReturnsAsync(delivery);
            mapperMock.Setup(mapper => mapper.Map<DeliveryDTO>(delivery)).Returns(deliveryDto);

            // Act
            var result = await deliveryService.GetAsync(deliveryId, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetByOrderAsync_WithRole_ReturnsDeliveryDTO()
        {
            // Arrange
            var orderId = Guid.NewGuid();
            var orderRole = OrderRole.Merchant;
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = orderId, Status = OrderStatus.Delivering };
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = orderId, Role = orderRole };
            var deliveryDTO = new DeliveryDTO();

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, cancellationToken)).ReturnsAsync(order);

            var deliveryRepositoryMock = new Mock<IDeliveryRepository>();
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(orderId, orderRole, cancellationToken)).ReturnsAsync(delivery);

            var mapperMock = new Mock<IMapper>();

            mapperMock.Setup(mapper => mapper.Map<DeliveryDTO>(delivery)).Returns(deliveryDTO);

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.GetByOrderAsync(orderId, orderRole, cancellationToken);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<DeliveryDTO>(result);
        }

        [Fact]
        public async Task GetByOrderAsync_WithoutRole_ReturnsNull()
        {
            // Arrange
            var orderId = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = orderId, Status = OrderStatus.Delivering };
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = orderId, Role = OrderRole.Merchant };

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, cancellationToken)).ReturnsAsync(order);

            var deliveryRepositoryMock = new Mock<IDeliveryRepository>();
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(orderId, OrderRole.Merchant, cancellationToken)).ReturnsAsync(delivery);

            var mapperMock = new Mock<IMapper>();



            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.GetByOrderAsync(orderId, null, cancellationToken);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task GetByOrderAsync_WithReturningStatus_ReturnsDeliveryDTO()
        {
            // Arrange
            var orderId = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = orderId, Status = OrderStatus.Returning };
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = orderId, Role = OrderRole.Customer };
            var deliveryDTO = new DeliveryDTO();

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, cancellationToken)).ReturnsAsync(order);

            var deliveryRepositoryMock = new Mock<IDeliveryRepository>();
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(orderId, OrderRole.Customer, cancellationToken)).ReturnsAsync(delivery);

            var mapperMock = new Mock<IMapper>();

            mapperMock.Setup(mapper => mapper.Map<DeliveryDTO>(delivery)).Returns(deliveryDTO);

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.GetByOrderAsync(orderId, null, cancellationToken);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<DeliveryDTO>(result);
        }

        [Fact]
        public async Task GetByOrderAsync_WithInvalidStatus_ReturnsNull()
        {
            // Arrange
            var orderId = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = orderId, Status = OrderStatus.Pending };

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(orderId, cancellationToken)).ReturnsAsync(order);

            var mapperMock = new Mock<IMapper>();

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.GetByOrderAsync(orderId, null, cancellationToken);

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task UpdateAsync_WhenOrderStatusAccepted_UpdatesDeliveryAndOrder_ReturnsTrue()
        {
            // Arrange
            var updateDeliveryDTO = new UpdateDeliveryDTO { Location = "New Location", ShippingProvider = "New Provider", ShippingId = "New ID", Comment = "New Comment" };
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Status = OrderStatus.Accepted, DeliveryType = DeliveryType.Pickup }; // Modify properties as needed
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = id, Role = OrderRole.Merchant }; // Modify properties as needed

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);

            var deliveryRepositoryMock = new Mock<IDeliveryRepository>();
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(id, OrderRole.Merchant, cancellationToken)).ReturnsAsync(delivery);

            var eventLogRepositoryMock = new Mock<IEventLogRepository>();
            var userRepositoryMock = new Mock<IUserRepository>();

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.UpdateAsync(updateDeliveryDTO, id, cancellationToken);

            // Assert
            Assert.True(result);
        }
        [Fact]
        public async Task UpdateAsync_WhenOrderStatusAcceptedAndDeliveryIsNull_UpdatesDeliveryAndOrder_ReturnsTrue()
        {
            // Arrange
            var updateDeliveryDTO = new UpdateDeliveryDTO { Location = "New Location", ShippingProvider = "New Provider", ShippingId = "New ID", Comment = "New Comment" };
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Status = OrderStatus.Accepted, DeliveryType = DeliveryType.Pickup }; // Modify properties as needed
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = id, Role = OrderRole.Merchant }; // Modify properties as needed

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);

            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(id, OrderRole.Merchant, cancellationToken)).ReturnsAsync((Delivery)null);

            deliveryRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Delivery>(), cancellationToken)).ReturnsAsync(true);
            eventLogRepositoryMock.Setup(eventLogRepositoryMock => eventLogRepositoryMock.AddAsync(It.IsAny<EventLog>(), cancellationToken)).ReturnsAsync(true);
            userRepositoryMock.Setup(repo => repo.AddNotificationAsync(It.IsAny<Notification>(), cancellationToken)).ReturnsAsync(true);

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.UpdateAsync(updateDeliveryDTO, id, cancellationToken);

            // Assert
            Assert.True(result);
        }
        [Fact]
        public async Task UpdateAsync_WhenOrderStatusProgress_UpdatesDeliveryAndOrder_ReturnsTrue()
        {
            // Arrange
            var updateDeliveryDTO = new UpdateDeliveryDTO { Location = "New Location", ShippingProvider = "New Provider", ShippingId = "New ID", Comment = "New Comment" };
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Status = OrderStatus.InProgress, DeliveryType = DeliveryType.Pickup }; // Modify properties as needed
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = id, Role = OrderRole.Merchant }; // Modify properties as needed

            var orderRepositoryMock = new Mock<IOrderRepository>();
            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);

            var deliveryRepositoryMock = new Mock<IDeliveryRepository>();
            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(id, OrderRole.Customer, cancellationToken)).ReturnsAsync(delivery);

            var eventLogRepositoryMock = new Mock<IEventLogRepository>();
            var userRepositoryMock = new Mock<IUserRepository>();

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.UpdateAsync(updateDeliveryDTO, id, cancellationToken);

            // Assert
            Assert.True(result);
        }
        [Fact]
        public async Task UpdateAsync_WhenOrderStatusInProgressAndDeliveryIsNull_UpdatesDeliveryAndOrder_ReturnsTrue()
        {
            // Arrange
            var updateDeliveryDTO = new UpdateDeliveryDTO { Location = "New Location", ShippingProvider = "New Provider", ShippingId = "New ID", Comment = "New Comment" };
            var id = Guid.NewGuid();
            var cancellationToken = CancellationToken.None;
            var order = new Order { Id = id, Status = OrderStatus.InProgress, DeliveryType = DeliveryType.Pickup }; // Modify properties as needed
            var delivery = new Delivery { Id = Guid.NewGuid(), Order = id, Role = OrderRole.Merchant }; // Modify properties as needed

            orderRepositoryMock.Setup(repo => repo.GetInternalAsync(id, cancellationToken)).ReturnsAsync(order);

            deliveryRepositoryMock.Setup(repo => repo.GetByOrderAndRoleAsync(id, OrderRole.Customer, cancellationToken)).ReturnsAsync((Delivery)null);

            deliveryRepositoryMock.Setup(repo => repo.AddAsync(It.IsAny<Delivery>(), cancellationToken)).ReturnsAsync(true);
            eventLogRepositoryMock.Setup(eventLogRepositoryMock => eventLogRepositoryMock.AddAsync(It.IsAny<EventLog>(), cancellationToken)).ReturnsAsync(true);
            userRepositoryMock.Setup(repo => repo.AddNotificationAsync(It.IsAny<Notification>(), cancellationToken)).ReturnsAsync(true);

            var deliveryService = new DeliveryService(deliveryRepositoryMock.Object, orderRepositoryMock.Object, eventLogRepositoryMock.Object, mapperMock.Object, userRepositoryMock.Object);

            // Act
            var result = await deliveryService.UpdateAsync(updateDeliveryDTO, id, cancellationToken);

            // Assert
            Assert.True(result);
        }
    }
}
