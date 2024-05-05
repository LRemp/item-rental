using FluentAssertions;
using ItemRental.Application.Users;
using ItemRental.Core.Contracts;
using ItemRental.Core.Domain;
using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using Moq;

namespace ItemRental.Tests.Application
{
    public class UserTest
    {
        private readonly Mock<IUserService> userService;
        private readonly Mock<IUserRepository> userRepository;
        private readonly Mock<IJwtTokenService> jwtTokenService;
        public UserTest()
        {
            userService = new Mock<IUserService>();
            userRepository = new Mock<IUserRepository>();
            jwtTokenService = new Mock<IJwtTokenService>();
        }

        [Fact]
        public async Task GetUserByUsernameQueryHandlerReturnsFailureResultNotFound()
        {
            userService.Setup(x => x.GetUserProfile(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((UserDTO)null);

            var query = new GetUserByUsernameQuery("username");

            var handler = new GetUserByUsernameQueryHandler(userService.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.NotFound);
        }

        [Fact]
        public async Task GetUserNotificationsQueryHandlerReturnsSuccessfulResult()
        {
            var notification = new Mock<NotificationDTO>();
            var notifications = new List<NotificationDTO> { notification.Object };

            userService.Setup(x => x.GetNotificationsAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(notifications);

            var query = new GetUserNotificationsQuery(Guid.NewGuid());

            var handler = new GetUserNotificationsQueryHandler(userService.Object);

            var result = await handler.Handle(query, CancellationToken.None);

            userService.Verify(userService => userService.GetNotificationsAsync(It.IsAny<Guid>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
            result.Value.Should().BeEquivalentTo(notifications);
        }

        [Fact]
        public async Task RegisterCommandHandlerShouldReturnFailureResultWhenNotUnique()
        {
            userRepository.Setup(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(false);

            var command = new RegisterCommand("test", "test", "test");

            var handler = new RegisterCommandHandler(userRepository.Object, userService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.EmailOrUsernameAlreadyInUse);
        }

        [Fact]
        public async Task RegisterCommandHandlerShouldReturnFailureResultWhenFailed()
        {
            userRepository.Setup(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            userRepository.Setup(x => x.AddAsync(It.IsAny<User>(), It.IsAny<CancellationToken>())).ReturnsAsync(false);

            var command = new RegisterCommand("test", "test", "test");

            var handler = new RegisterCommandHandler(userRepository.Object, userService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            userRepository.Verify(x => x.AddAsync(It.IsAny<User>(), It.IsAny<CancellationToken>()), Times.Once);

            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.FailedToCreate);
        }

        [Fact]
        public async Task RegisterCommandHandlerShouldReturnSuccessResult()
        {
            userRepository.Setup(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            userRepository.Setup(x => x.AddAsync(It.IsAny<User>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(true);

            var command = new RegisterCommand("test", "test", "test");

            var handler = new RegisterCommandHandler(userRepository.Object, userService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.IsEmailAndUsernameUniqueAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            userRepository.Verify(x => x.AddAsync(It.IsAny<User>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }

        [Fact]
        public async Task LoginCommandHandlerShouldReturnFailureResultWhenInvalid()
        {
            userRepository.Setup(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync((User)null);

            var command = new LoginCommand("test", "test");

            var handler = new LoginCommandHandler(userRepository.Object, userService.Object, jwtTokenService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.NotFound);
        }

        [Fact]
        public async Task LoginCommandShouldReturnFailureResultWhenPasswordInvalid()
        {
            var user = new User
            {
                Username = "test",
                Password = "test",
                Email = "test@itemrental.com",
                AvatarURL = "",
                Name = "Test",
                Surname = "User"
            };

            userService.Setup(x => x.VerifyPasswordHash(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(false);

            userRepository.Setup(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);
            
            var command = new LoginCommand("test", "test");

            var handler = new LoginCommandHandler(userRepository.Object, userService.Object, jwtTokenService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            result.IsFailure.Should().BeTrue();
            result.Error.Should().Be(DomainErrors.User.InvalidCredentials);
        }

        [Fact]
        public async Task LoginCommandShouldReturnSuccessResult()
        {
            var user = new User
            {
                Username = "test",
                Password = "test",
                Email = "test@itemrental.com",
                AvatarURL = "",
                Name = "Test",
                Surname = "User"
            };

            userService.Setup(x => x.VerifyPasswordHash(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);

            userRepository.Setup(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(user);

            jwtTokenService.Setup(x => x.CreateAccessToken(It.IsAny<User>(), It.IsAny<List<string>>())).ReturnsAsync("token");

            var command = new LoginCommand("test", "test");

            var handler = new LoginCommandHandler(userRepository.Object, userService.Object, jwtTokenService.Object);

            var result = await handler.Handle(command, CancellationToken.None);

            userRepository.Verify(x => x.GetByEmailOrUsernameAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()), Times.Once);
            userService.Verify(x => x.VerifyPasswordHash(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
            jwtTokenService.Verify(x => x.CreateAccessToken(It.IsAny<User>(), It.IsAny<List<string>>()), Times.Once);
            result.IsSuccess.Should().BeTrue();
        }
    }
}
