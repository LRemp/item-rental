using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }
        public async Task<bool> IsDateNotTaken(Guid id, DateTime startTime, DateTime endTime, CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetListingOrdersAsync(id, cancellationToken);

            foreach (OrderDTO order in orders)
            {
                if (startTime < order.EndDate && endTime > order.StartDate)
                {
                    return false; // There is overlap, date is taken
                }
            }

            return true; // No overlapping dates found, date is available
        }
    }
}
