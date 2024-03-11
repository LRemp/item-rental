using ItemRental.Core.DTOs;
using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Contracts
{
    public interface IRentListingRepository
    {
        public Task<bool> AddAsync(RentListing rentalListing, CancellationToken cancellationToken);
        public Task<List<RentListingDTO>> GetAsync(CancellationToken cancellationToken);
        public Task<RentListingDTO> GetAsync(Guid id, CancellationToken cancellationToken);
        public Task<RentListingDTO> GetByOwnerAsync(Guid owner, CancellationToken cancellationToken);
        public Task<bool> UpdateAsync(RentListing rentalListing, CancellationToken cancellationToken);
    }
}
