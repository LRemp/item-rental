using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class Delivery : Entity
    {
        public DeliveryType Type { get; set; }
        public Guid Order { get; set; }
        public string? Location { get; set; }
        public string? ShippingProvider { get; set; }
        public string? ShippingId { get; set; }
        public string? Comment { get; set; }
        public int Completed = 0;
    }
}
