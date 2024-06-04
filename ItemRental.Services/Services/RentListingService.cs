using AutoMapper;
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
        private readonly IMapper mapper;
        public RentListingService(IOrderRepository orderRepository, IRentListingRepository rentListingRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.rentListingRepository = rentListingRepository;
            this.mapper = mapper;
        }

        public async Task<List<OrderDateDTO>> GetBusyDatesAsync(Guid id, CancellationToken cancellationToken)
        {
            List<OrderDateDTO> dates = new List<OrderDateDTO>();
            var orders = await orderRepository.GetListingOrdersAsync(id, cancellationToken);
            
            foreach(OrderDTO order in orders)
            {
                dates.Add(new OrderDateDTO { 
                    Status = order.Status,
                    StartDate = order.StartDate, 
                    EndDate = order.EndDate 
                });
            }

            return dates;
        }

        public async Task<List<CommentDTO>> GetCommentsDTOAsync(Guid id, CancellationToken cancellationToken)
        {
            var comments = await rentListingRepository.GetCommentsAsync(id, CancellationToken.None);
            var commentDTOs = mapper.Map<List<CommentDTO>>(comments);
            return commentDTOs;
        }

        public Task<RentListingDTO> GetListingDTOAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<RentListingDTO>> GetListingsDTOAsync()
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
