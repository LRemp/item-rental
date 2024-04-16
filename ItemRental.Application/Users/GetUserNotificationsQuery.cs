using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Users
{
    public sealed record GetUserNotificationsQuery(Guid user): IQuery<List<NotificationDTO>>;
    internal class GetUserNotificationsQueryHandler : IQueryHandler<GetUserNotificationsQuery, List<NotificationDTO>>
    {
        private readonly IUserService userService;
        public GetUserNotificationsQueryHandler(IUserService userService)
        {
            this.userService = userService;
        }
        public async Task<Result<List<NotificationDTO>>> Handle(GetUserNotificationsQuery request, CancellationToken cancellationToken)
        {
            var notifications = await userService.GetNotificationsAsync(request.user, cancellationToken);

            return notifications;
        }
    }
}
