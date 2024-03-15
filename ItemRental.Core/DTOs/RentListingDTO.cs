using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class RentListingDTO
    {
        public Guid Id { get; set; }
        public ItemDTO Item { get; set; }
        public UserDTO Renter { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Location { get; set; } = string.Empty;
    }
}
