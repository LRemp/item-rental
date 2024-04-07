using ItemRental.Core.Contracts;
using ItemRental.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class RentListingService : IRentListingService
    {
        private readonly IOrderRepository orderRepository;
        public RentListingService(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        public async Task<List<OrderDateDTO>> GetBusyDatesAsync(Guid id, CancellationToken cancellationToken)
        {
            List<OrderDateDTO> dates = new List<OrderDateDTO>();
            var orders = await orderRepository.GetListingOrdersAsync(id, cancellationToken);
            
            foreach(OrderDTO order in orders)
            {
                dates.Add(new OrderDateDTO { 
                    StartDate = order.StartDate, 
                    EndDate = order.EndDate 
                });
            }

            return dates;
        }

        public Task<RentListingDTO> GetListingDTOAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<RentListingDTO>> GetListingsDTOAsync()
        {
            throw new NotImplementedException();
        }
    }
}
