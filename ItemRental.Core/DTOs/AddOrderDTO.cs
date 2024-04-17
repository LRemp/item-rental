using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class AddOrderDTO
    {
        public Guid RentListing { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DeliveryType DeliveryType { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
