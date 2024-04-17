using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Enums
{
    public enum OrderStatus
    {
        Pending,
        Accepted,
        Delivering,
        InProgress,
        Returning,
        Completed,
        Rejected,
        Cancelled
    }
}
