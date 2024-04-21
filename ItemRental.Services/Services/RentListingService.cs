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
        private readonly IRentListingRepository rentListingRepository;
        public RentListingService(IOrderRepository orderRepository, IRentListingRepository rentListingRepository)
        {
            this.orderRepository = orderRepository;
            this.rentListingRepository = rentListingRepository;
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

        public async Task<bool> IsItemUsed(Guid id, CancellationToken cancellationToken)
        {
            var listing = await rentListingRepository.GetWithItemAsync(id, cancellationToken);

            return listing is not null;
        }
    }
}
