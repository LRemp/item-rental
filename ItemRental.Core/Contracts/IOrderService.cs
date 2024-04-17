using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IOrderService
    {
        public Task<OrderDTO?> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<Result<Guid>> CreateAsync(AddOrderDTO addOrderDTO, Guid user, CancellationToken cancellationToken);
        public Task<Result> AcceptAsync(Guid id, Guid user, CancellationToken cancellationToken);
        public Task<bool> IsDateNotTaken(Guid id, DateTime startTime, DateTime endTime, CancellationToken cancellationToken);
    }
}
