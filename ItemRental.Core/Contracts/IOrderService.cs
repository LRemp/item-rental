using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IOrderService
    {
        public Task<bool> IsDateNotTaken(Guid id, DateTime startTime, DateTime endTime, CancellationToken cancellationToken);
    }
}
