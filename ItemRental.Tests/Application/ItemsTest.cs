using FluentAssertions;
using ItemRental.Application.Items;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using ItemRental.Repositories.Repositories;
using Moq;

namespace ItemRental.Tests.Application
{
    public class ItemsTest
    {
        private readonly Mock<IItemRepository> _itemRepositoryMock;
        private readonly Mock<IOrderService> _orderServiceMock;
        private readonly Mock<IRentListingService> _rentListingService;

        public ItemsTest()
        {
            _itemRepositoryMock = new Mock<IItemRepository>();
            _orderServiceMock = new Mock<IOrderService>();
            _rentListingService = new Mock<IRentListingService>();
        }

        [Fact]
        public async Task AddItemCalledShouldReturnSuccessResult()
        {
            //Arrange
            var user = Guid.NewGuid();
            var addItemDTO = new AddItemDTO
            {
                Name = "Test Item",
                Description = "Test Description"
            };
            var command = new AddItemCommand(user, addItemDTO);

            _itemRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Item>(), default)).ReturnsAsync(true);

            var handler = new AddItemCommandHandler(_itemRepositoryMock.Object);

            //Act
            Result<Guid> result = await handler.Handle(command, default);

            //Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task AddItemCalledShouldReturnFailureResult()
        {
            //Arrange
            var user = Guid.NewGuid();
            var addItemDTO = new AddItemDTO
            {
                Name = "Test Item",
                Description = "Test Description"
            };
            var command = new AddItemCommand(user, addItemDTO);

            _itemRepositoryMock.Setup(x => x.AddAsync(It.IsAny<Item>(), default)).ReturnsAsync(false);

            var handler = new AddItemCommandHandler(_itemRepositoryMock.Object);

            //Act
            Result<Guid> result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.FailedToCreate);
        }

        [Fact]
        public async Task DeleteItemShouldReturnFailureResultWhenItemDoesntExist()
        {
            var command = new DeleteItemCommand(Guid.NewGuid(), Guid.NewGuid());

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, null, null);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync((Item)null);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.NotFound);
        }

        [Fact]
        public async Task DeleteItemShouldReturnFailureResultWhenNotAuthorized()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, Guid.NewGuid());

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, null, null);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.Unauthorized);
        }

        [Fact]
        public async Task DeleteItemShouldReturnFailureResultWhenIncludedInListing()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, item.Owner);

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, _orderServiceMock.Object, _rentListingService.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _rentListingService.Setup(x => x.IsItemUsed(It.IsAny<Guid>(), default)).ReturnsAsync(true);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.UsedInListing);
        }

        [Fact]
        public async Task DeleteItemShouldReturnFailureResultWhenUsedInOrder()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, item.Owner);

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, _orderServiceMock.Object, _rentListingService.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _rentListingService.Setup(x => x.IsItemUsed(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _orderServiceMock.Setup(x => x.IsItemInUse(It.IsAny<Guid>(), default)).ReturnsAsync(true);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.UsedInOrder);
        }

        [Fact]
        public async Task DeleteItemShouldReturnFailureResultWhenDeleting()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, item.Owner);

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, _orderServiceMock.Object, _rentListingService.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _rentListingService.Setup(x => x.IsItemUsed(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _orderServiceMock.Setup(x => x.IsItemInUse(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _itemRepositoryMock.Setup(x => x.DeleteAsync(It.IsAny<Guid>(), default)).ReturnsAsync(false);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.FailedToDelete);
        }

        [Fact]
        public async Task DeleteItemShouldReturnSuccessResultWhenDeleting()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, item.Owner);

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, _orderServiceMock.Object, _rentListingService.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _rentListingService.Setup(x => x.IsItemUsed(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _orderServiceMock.Setup(x => x.IsItemInUse(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _itemRepositoryMock.Setup(x => x.DeleteAsync(It.IsAny<Guid>(), default)).ReturnsAsync(true);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task GetCategoriesQueryShouldReturnList()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            var command = new DeleteItemCommand(item.Id, item.Owner);

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object, _orderServiceMock.Object, _rentListingService.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _rentListingService.Setup(x => x.IsItemUsed(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _orderServiceMock.Setup(x => x.IsItemInUse(It.IsAny<Guid>(), default)).ReturnsAsync(false);
            _itemRepositoryMock.Setup(x => x.DeleteAsync(It.IsAny<Guid>(), default)).ReturnsAsync(true);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsSuccess.Should().BeTrue();
        }
    }
}
