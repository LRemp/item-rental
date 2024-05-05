using ItemRental.API.Controllers;
using ItemRental.Application.Users;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using ItemRental.Services.Extensions.Messaging;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Tests.Controllers
{
    public class UserControllerTest
    {
        private readonly Mock<ISender> senderMock;
        private UsersController controller;
        public UserControllerTest()
        {
            this.senderMock = new Mock<ISender>();
            this.controller = new UsersController(senderMock.Object, null);
        }
    }
}
