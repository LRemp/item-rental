using FluentAssertions;
using ItemRental.Application.RentListings;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using ItemRental.Core.Helpers;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Tests.Application
{
    public class RentListingTest
    {
        private readonly Mock<IRentListingRepository> rentListingRepository;
        private readonly Mock<IRentListingService> rentListingService;
        public RentListingTest()
        {
            rentListingRepository = new Mock<IRentListingRepository>();
            rentListingService = new Mock<IRentListingService>();
        }

        [Fact]
        public async Task GetRentListingByIdQueryReturnsFailureResultWhenNotFound()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetAsync(rentListingId, default)).ReturnsAsync((RentListingDTO)null);
            var query = new GetRentListingByIdQuery(rentListingId);
            var handler = new GetRentListingByIdHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(query, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.RentListing.NotFound, result.Error);
        }

        [Fact]
        public async Task GetRentListingByIdQueryReturnsSuccessfulResult()
        {
            Guid id = Guid.NewGuid();
            var rentListing = new RentListingDTO
            {
                Id = id,
                Item = null,
                Renter = null,
                Title = "Title",
                Description = "Description",
                Location = "Location",
                Price = 10.0m,
            };

            rentListingRepository.Setup(x => x.GetAsync(id, default)).ReturnsAsync(rentListing);

            var query = new GetRentListingByIdQuery(id);

            var handler = new GetRentListingByIdHandler(rentListingRepository.Object);

            var result = await handler.Handle(query, default);

            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(rentListing);
        }

        [Fact]
        public async Task AddRentListingCommandHandlerReturnsFailureResultWhenFailedToAdd()
        {
            // Arrange
            var addRentListingDTO = new AddRentListingDTO
            {
                Item = Guid.NewGuid(),
                Title = "Title",
                Description = "Description",
                Location = "Location",
                Price = 10.0m,
            };
            var user = Guid.NewGuid();
            rentListingRepository.Setup(x => x.AddAsync(It.IsAny<RentListing>(), default)).ReturnsAsync(false);
            var command = new AddRentListingCommand(addRentListingDTO, user);
            var handler = new AddRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.RentListing.FailedToCreate, result.Error);
        }

        [Fact]
        public async Task AddRentListingCommandHandlerReturnsSuccessfulResult()
        {
            // Arrange
            var addRentListingDTO = new AddRentListingDTO
            {
                Item = Guid.NewGuid(),
                Title = "Title",
                Description = "Description",
                Location = "Location",
                Price = 10.0m,
            };
            var user = Guid.NewGuid();
            var rentListing = new RentListing
            {
                Id = Guid.NewGuid(),
                Item = addRentListingDTO.Item,
                Renter = user,
                Title = addRentListingDTO.Title,
                Description = addRentListingDTO.Description,
                Location = addRentListingDTO.Location,
                Price = addRentListingDTO.Price,
            };
            rentListingRepository.Setup(x => x.AddAsync(It.IsAny<RentListing>(), default)).ReturnsAsync(true);
            var command = new AddRentListingCommand(addRentListingDTO, user);
            var handler = new AddRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().NotBeEmpty();
        }

        [Fact]
        public async Task DeleteRentListingCommandHandlerReturnsFailureResultWhenNotFound()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            var user = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetInternalAsync(rentListingId, default)).ReturnsAsync((RentListing)null);
            var command = new DeleteRentListingCommand(rentListingId, user);
            var handler = new DeleteRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.RentListing.NotFound, result.Error);
        }

        [Fact]
        public async Task DeleteRentListingCommandHandlerReturnsFailureResultWhenNotRenter()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            var user = Guid.NewGuid();
            var rentListing = new RentListing
            {
                Id = rentListingId,
                Renter = Guid.NewGuid(),
            };
            rentListingRepository.Setup(x => x.GetInternalAsync(rentListingId, default)).ReturnsAsync(rentListing);
            var command = new DeleteRentListingCommand(rentListingId, user);
            var handler = new DeleteRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.RentListing.NotRenter, result.Error);
        }

        [Fact]
        public async Task DeleteRentListingCommandHandlerReturnsFailureResultWhenFailedToDelete()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            var user = Guid.NewGuid();
            var rentListing = new RentListing
            {
                Id = rentListingId,
                Renter = user,
            };
            rentListingRepository.Setup(x => x.GetInternalAsync(rentListingId, default)).ReturnsAsync(rentListing);
            rentListingRepository.Setup(x => x.DeleteAsync(rentListingId, default)).ReturnsAsync(false);
            var command = new DeleteRentListingCommand(rentListingId, user);
            var handler = new DeleteRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.RentListing.FailedToDelete, result.Error);
        }

        [Fact]
        public async Task DeleteRentListingCommandHandlerReturnsSuccessfulResult()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            var user = Guid.NewGuid();
            var rentListing = new RentListing
            {
                Id = rentListingId,
                Renter = user,
            };
            rentListingRepository.Setup(x => x.GetInternalAsync(rentListingId, default)).ReturnsAsync(rentListing);
            rentListingRepository.Setup(x => x.DeleteAsync(rentListingId, default)).ReturnsAsync(true);
            var command = new DeleteRentListingCommand(rentListingId, user);
            var handler = new DeleteRentListingCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task UpdateCommentCommandHandlerReturnsFailureResultWhenCommentNotFound()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync((Comment)null);
            var command = new UpdateCommentCommand(commentId, userId, "Text");
            var handler = new UpdateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.NotFound, result.Error);
        }

        [Fact]
        public async Task UpdateCommentCommandHandlerReturnsFailureResultWhenUserIsNotCommentOwner()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = Guid.NewGuid(),
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            var command = new UpdateCommentCommand(commentId, userId, "Text");
            var handler = new UpdateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.Unauthorized, result.Error);
        }

        [Fact]
        public async Task UpdateCommentCommandHandlerReturnsFailureResultWhenFailedToUpdateComment()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = userId,
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            rentListingRepository.Setup(x => x.UpdateCommentAsync(It.IsAny<Comment>(), default)).ReturnsAsync(false);
            var command = new UpdateCommentCommand(commentId, userId, "Text");
            var handler = new UpdateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.Failed, result.Error);
        }

        [Fact]
        public async Task UpdateCommentCommandHandlerReturnsSuccessfulResult()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = userId,
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            rentListingRepository.Setup(x => x.UpdateCommentAsync(It.IsAny<Comment>(), default)).ReturnsAsync(true);
            var command = new UpdateCommentCommand(commentId, userId, "Text");
            var handler = new UpdateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task DeleteCommentCommandHandlerReturnsFailureResultWhenCommentNotFound()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync((Comment)null);
            var command = new DeleteCommentCommand(commentId, userId);
            var handler = new DeleteCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.NotFound, result.Error);
        }

        [Fact]
        public async Task DeleteCommentCommandHandlerReturnsFailureResultWhenUserIsNotCommentOwner()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = Guid.NewGuid(),
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            var command = new DeleteCommentCommand(commentId, userId);
            var handler = new DeleteCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.Unauthorized, result.Error);
        }

        [Fact]
        public async Task DeleteCommentCommandHandlerReturnsFailureResultWhenFailedToDeleteComment()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = userId,
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            rentListingRepository.Setup(x => x.DeleteCommentAsync(commentId, default)).ReturnsAsync(false);
            var command = new DeleteCommentCommand(commentId, userId);
            var handler = new DeleteCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsFailure);
            Assert.Equal(DomainErrors.Comment.Failed, result.Error);
        }

        [Fact]
        public async Task DeleteCommentCommandHandlerReturnsSuccessfulResult()
        {
            // Arrange
            var commentId = Guid.NewGuid();
            var userId = Guid.NewGuid();
            var comment = new Comment
            {
                Id = commentId,
                User = userId,
            };
            rentListingRepository.Setup(x => x.GetCommentAsync(commentId, default)).ReturnsAsync(comment);
            rentListingRepository.Setup(x => x.DeleteCommentAsync(commentId, default)).ReturnsAsync(true);
            var command = new DeleteCommentCommand(commentId, userId);
            var handler = new DeleteCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            Assert.True(result.IsSuccess);
        }

        [Fact]
        public async Task GetCommentsQueryHandlerReturnsComments()
        {
            // Arrange
            var resource = Guid.NewGuid();
            var comments = new List<CommentDTO>
            {
                new CommentDTO
                {
                    Id = Guid.NewGuid(),
                    Text = "Text",
                    CreatedAt = DateTime.UtcNow,
                }
            };
            rentListingRepository.Setup(x => x.GetCommentsAsync(resource, default)).ReturnsAsync(comments);
            var query = new GetCommentsQuery(resource);
            var handler = new GetCommentsQueryHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(query, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(comments);
        }

        [Fact]
        public async Task GetCommentsQueryHandlerReturnsEmptyListWhenNoComments()
        {
            // Arrange
            var resource = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetCommentsAsync(resource, default)).ReturnsAsync(new List<CommentDTO>());
            var query = new GetCommentsQuery(resource);
            var handler = new GetCommentsQueryHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(query, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEmpty();
        }

        [Fact]
        public async Task GetCommentsQueryHandlerReturnsFailureResultWhenFailedToGetComments()
        {
            // Arrange
            var resource = Guid.NewGuid();
            rentListingRepository.Setup(x => x.GetCommentsAsync(resource, default)).ReturnsAsync((List<CommentDTO>)null);
            var query = new GetCommentsQuery(resource);
            var handler = new GetCommentsQueryHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(query, default);

            // Assert
            result.IsFailure.Should().BeTrue();
        }

        [Fact]
        public async Task CreateCommentCommandHandlerReturnsFailureResultWhenFailedToAddComment()
        {
            Guid item = Guid.NewGuid();
            Guid user = Guid.NewGuid();
            var comment = "Test commet";

            rentListingRepository.Setup(x => x.AddCommentAsync(It.IsAny<Comment>(), default)).ReturnsAsync(false);
            var command = new CreateCommentCommand(item, user, comment);
            var handler = new CreateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.Comment.FailedToCreate);
        }

        [Fact]
        public async Task CreateCommentCommandHandlerReturnsSuccessfulResult()
        {
            Guid item = Guid.NewGuid();
            Guid user = Guid.NewGuid();
            var comment = "Test commet";

            rentListingRepository.Setup(x => x.AddCommentAsync(It.IsAny<Comment>(), default)).ReturnsAsync(true);
            var command = new CreateCommentCommand(item, user, comment);
            var handler = new CreateCommentCommandHandler(rentListingRepository.Object);

            // Act
            var result = await handler.Handle(command, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task UpdateRentListingCommandHandlerReturnsFailureOnNotFound()
        {
            rentListingRepository.Setup(x => x.GetInternalAsync(It.IsAny<Guid>(), default)).ReturnsAsync((RentListing)null);

            var command = new UpdateRentListingCommand(new UpdateRentListingDTO(), Guid.NewGuid());

            var handler = new UpdateRentListingCommandHandler(rentListingRepository.Object);

            var result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.RentListing.NotFound);
        }

        [Fact]
        public async Task UpdateRentListingCommandHandlerReturnsFailureOnNotOwner()
        {
            var rentListing = new RentListing
            {
                Id = Guid.NewGuid(),
                Renter = Guid.NewGuid(),
            };

            rentListingRepository.Setup(x => x.GetInternalAsync(It.IsAny<Guid>(), default)).ReturnsAsync(rentListing);

            var command = new UpdateRentListingCommand(new UpdateRentListingDTO(), Guid.NewGuid());

            var handler = new UpdateRentListingCommandHandler(rentListingRepository.Object);

            var result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.RentListing.NotRenter);
        }

        [Fact]
        public async Task UpdateRentListingCommandHandlerReturnsFailureOnFailedToUpdate()
        {
            var rentListing = new RentListing
            {
                Id = Guid.NewGuid(),
                Renter = Guid.NewGuid(),
            };

            rentListingRepository.Setup(x => x.GetInternalAsync(It.IsAny<Guid>(), default)).ReturnsAsync(rentListing);
            rentListingRepository.Setup(x => x.UpdateAsync(It.IsAny<RentListing>(), default)).ReturnsAsync(false);

            var command = new UpdateRentListingCommand(new UpdateRentListingDTO(), rentListing.Renter);

            var handler = new UpdateRentListingCommandHandler(rentListingRepository.Object);

            var result = await handler.Handle(command, default);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.RentListing.FailedToUpdate);
        }

        [Fact]
        public async Task UpdateRentListingCommandHandlerReturnsSuccess()
        {
            var rentListing = new RentListing
            {
                Id = Guid.NewGuid(),
                Renter = Guid.NewGuid(),
            };

            rentListingRepository.Setup(x => x.GetInternalAsync(It.IsAny<Guid>(), default)).ReturnsAsync(rentListing);
            rentListingRepository.Setup(x => x.UpdateAsync(It.IsAny<RentListing>(), default)).ReturnsAsync(true);

            var command = new UpdateRentListingCommand(new UpdateRentListingDTO(), rentListing.Renter);

            var handler = new UpdateRentListingCommandHandler(rentListingRepository.Object);

            var result = await handler.Handle(command, default);

            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task GetRentListingBusyDatesQueryHandlerReturnsDates()
        {
            // Arrange
            var rentListingId = Guid.NewGuid();
            var dates = new List<OrderDateDTO>
            {
                new OrderDateDTO
                {
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddDays(1),
                }
            };
            rentListingService.Setup(x => x.GetBusyDatesAsync(rentListingId, default)).ReturnsAsync(dates);
            var query = new GetRentListingBusyDatesQuery(rentListingId);
            var handler = new GetRentListingBusyDatesQueryHandler(rentListingService.Object);

            // Act
            var result = await handler.Handle(query, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(dates);
        }

        [Fact]
        public async Task GetRentListingsByOwnerQueryReturnsSuccessfulResult()
        {
            // Arrange
            var owner = Guid.NewGuid();
            var rentListings = new List<RentListingDTO>
            {
                new RentListingDTO
                {
                    Id = Guid.NewGuid(),
                    Item = null,
                    Renter = null,
                    Title = "Title",
                    Description = "Description",
                    Location = "Location",
                    Price = 10.0m,
                }
            };
            rentListingRepository.Setup(x => x.GetByOwnerAsync(owner, default)).ReturnsAsync(rentListings);
            var query = new GetRentListingByOwnerQuery(owner);
            var handler = new GetRentListingByOwnerQueryHandler(rentListingRepository.Object);
             
            // Act
            var result = await handler.Handle(query, default);

            // Assert
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(rentListings);
        }

        [Fact]
        public async Task GetRentListingsQueryReturnsSuccessfulResult()
        { 
            rentListingRepository.Setup(x => x.GetAsync(null, null, 0, default)).ReturnsAsync(new PaginatedResult<List<RentListingDTO>>());

            var query = new GetRentListingsQuery(null, null, null, null, null);

            var handler = new GetRentListingsQueryHandler(rentListingRepository.Object);

            var result = await handler.Handle(query, default);

            result.IsSuccess.Should().BeTrue();
        }
    }
}
