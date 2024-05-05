using ItemRental.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IRentListingService
    {
        public Task<RentListingDTO> GetListingDTOAsync(Guid id);
        public Task<List<RentListingDTO>> GetListingsDTOAsync();
        public Task<List<CommentDTO>> GetCommentsDTOAsync(Guid id, CancellationToken cancellationToken);
        public Task<List<OrderDateDTO>> GetBusyDatesAsync(Guid id, CancellationToken cancellationToken);
        public Task<bool> IsItemUsed(Guid id, CancellationToken cancellationToken);
    }
}
