using ItemRental.Core.Helpers;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Extensions.Messaging
{
    public interface ICommand : IRequest<Result> {}
    public interface ICommand<TResponse> : IRequest<Result<TResponse>> {}
}
