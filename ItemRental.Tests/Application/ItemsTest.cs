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

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object);

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

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);

            //Act
            Result result = await handler.Handle(command, default);

            //Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.Unauthorized);
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

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object);

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

            var handler = new DeleteItemCommandHandler(_itemRepositoryMock.Object);

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
            var category = new CategoryDTO
            {
                Name = "Test Category",
                Label = "Test Label"
            };
            List<CategoryDTO> categories = new List<CategoryDTO> { category };

            var command = new GetCategoriesQuery();

            var handler = new GetCategoriesQueryHandler(_itemRepositoryMock.Object);

            _itemRepositoryMock.Setup(x => x.GetCategoriesAsync(default)).ReturnsAsync(categories);

            //Act
            Result<List<CategoryDTO>> result = await handler.Handle(command, default);

            //Assert
            _itemRepositoryMock.Verify(x => x.GetCategoriesAsync(default), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value[0].Should().BeEquivalentTo(category);
        }

        [Fact]
        public async Task GetItemByIdQueryShouldReturnFailureResult()
        {
            var command = new GetItemByIdQuery(Guid.NewGuid());

            var handler = new GetItemByIdQueryHandler(_itemRepositoryMock.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync((Item)null);

            Result<ItemDTO> result = await handler.Handle(command, default);

            _itemRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>(), default), Times.Once);
            result.IsFailure.Should().BeTrue();
        }

        [Fact]
        public async Task GetItemByIdQueryShouldReturnSuccessfulResult()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Name = "Test Item",
                Description = "Test Description",
                Category = "Test Category",
                Tags = "[\"Test Tag\"]"
            };

            var itemDTO = new ItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Category = item.Category,
                Tags = [ "Test Tag" ]
            };

            var command = new GetItemByIdQuery(Guid.NewGuid());

            var handler = new GetItemByIdQueryHandler(_itemRepositoryMock.Object);

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);

            Result<ItemDTO> result = await handler.Handle(command, default);

            _itemRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>(), default), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(itemDTO);
        }

        [Fact]
        public async Task GetItemsQueryShouldReturnList()
        {
            var item = new Item
            {
                Id = Guid.NewGuid(),
                Name = "Test Item",
                Description = "Test Description",
                Tags = "[\"Test Tag\"]"
            };

            var itemDTO = new ItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Description = item.Description,
                Tags = ["Test Tag"]
            };

            List<Item> items = new List<Item> { item };

            List<ItemDTO> itemDTOs = new List<ItemDTO> { itemDTO };

            var command = new GetItemsQuery(Guid.NewGuid());

            var handler = new GetItemsQueryHandler(_itemRepositoryMock.Object);

            _itemRepositoryMock.Setup(x => x.GetByOwnerAsync(It.IsAny<Guid>(), default)).ReturnsAsync(items);

            Result<List<ItemDTO>> result = await handler.Handle(command, default);

            _itemRepositoryMock.Verify(x => x.GetByOwnerAsync(It.IsAny<Guid>(), default), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(itemDTOs);
        }

        [Fact]
        public async Task UpdateItemCommandShouldReturnFailureResultWhenNotFound()
        {
            Guid user = Guid.NewGuid();

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync((Item)null);

            var command = new UpdateItemCommand(new ItemDTO(), user);

            var handler = new UpdateItemCommandHandler(_itemRepositoryMock.Object);

            Result result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.NotFound);
        }

        [Fact]
        public async Task UpdateItemCommandShouldReturnFailureResultWhenNotAuthorized()
        {
            Guid user = Guid.NewGuid();

            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = Guid.NewGuid()
            };

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);

            var command = new UpdateItemCommand(new ItemDTO { Id = item.Id }, user);

            var handler = new UpdateItemCommandHandler(_itemRepositoryMock.Object);

            Result result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.Unauthorized);
        }

        [Fact]
        public async Task UpdateItemCommandShouldReturnFailureResultWhenFailedToUpdate()
        {
            Guid user = Guid.NewGuid();

            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = user
            };

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _itemRepositoryMock.Setup(x => x.UpdateAsync(It.IsAny<Item>(), default)).ReturnsAsync(false);

            var command = new UpdateItemCommand(new ItemDTO { Id = item.Id }, user);

            var handler = new UpdateItemCommandHandler(_itemRepositoryMock.Object);

            Result result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Item.NotFound);
        }

        [Fact]
        public async Task UpdateItemCommandShouldReturnSuccessResult()
        {
            Guid user = Guid.NewGuid();

            var item = new Item
            {
                Id = Guid.NewGuid(),
                Owner = user
            };

            _itemRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>(), default)).ReturnsAsync(item);
            _itemRepositoryMock.Setup(x => x.UpdateAsync(It.IsAny<Item>(), default)).ReturnsAsync(true);

            var command = new UpdateItemCommand(new ItemDTO { Id = item.Id }, user);

            var handler = new UpdateItemCommandHandler(_itemRepositoryMock.Object);

            Result result = await handler.Handle(command, default);

            result.IsSuccess.Should().BeTrue();
        }
    }
}
