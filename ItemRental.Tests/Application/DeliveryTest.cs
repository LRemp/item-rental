using ItemRental.Application.Delivery;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Enums;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Tests.Application
{
    public class DeliveryTest
    {
        private readonly Mock<IDeliveryService> deliveryService;
        public DeliveryTest()
        {
            deliveryService = new Mock<IDeliveryService>();
        }

        [Fact]
        public async Task UpdateDeliveryCommandHandler_Success()
        {
            // Arrange
            var command = new UpdateDeliveryCommand(Guid.NewGuid(), Guid.NewGuid(), new UpdateDeliveryDTO());
            deliveryService.Setup(x => x.UpdateAsync(It.IsAny<UpdateDeliveryDTO>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            var handler = new UpdateDeliveryCommandHandler(deliveryService.Object);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task UpdateDeliveryCommandHandler_Failure()
        {
            // Arrange
            var command = new UpdateDeliveryCommand(Guid.NewGuid(), Guid.NewGuid(), new UpdateDeliveryDTO());
            deliveryService.Setup(x => x.UpdateAsync(It.IsAny<UpdateDeliveryDTO>(), It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(false);
            var handler = new UpdateDeliveryCommandHandler(deliveryService.Object);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsFailure);
        }

        [Fact]
        public async Task ConfirmDeliveryCommandHandler_Success()
        {
            // Arrange
            var command = new ConfirmDeliveryCommand(Guid.NewGuid(), Guid.NewGuid());
            deliveryService.Setup(x => x.CompleteDeliveryAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(true);
            var handler = new ConfirmDeliveryCommandHandler(deliveryService.Object);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task ConfirmDeliveryCommandHandler_Failure()
        {
            // Arrange
            var command = new ConfirmDeliveryCommand(Guid.NewGuid(), Guid.NewGuid());
            deliveryService.Setup(x => x.CompleteDeliveryAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>())).ReturnsAsync(false);
            var handler = new ConfirmDeliveryCommandHandler(deliveryService.Object);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsFailure);
        }

        [Fact]
        public async Task GetDeliveryQueryHandler_Success()
        {
            // Arrange
            var query = new GetDeliveryQuery(Guid.NewGuid(), Guid.NewGuid(), OrderRole.Merchant);
            deliveryService.Setup(x => x.GetByOrderAsync(It.IsAny<Guid>(), It.IsAny<OrderRole?>(), It.IsAny<CancellationToken>())).ReturnsAsync(new DeliveryDTO());
            var handler = new GetDeliveryQueryHandler(deliveryService.Object);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
        }
    }
}
