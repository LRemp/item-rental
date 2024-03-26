using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class OrderDTO
    {
        public Guid Id { get; set; }
        public RentListingDTO RentListing { get; set; }
        public UserDTO User { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public OrderStatus Status { get; set; }
    }
}
