using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ItemRental.Core.Enums;

namespace ItemRental.Core.DTOs
{
    public class OrderDateDTO
    {
        public OrderStatus Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
