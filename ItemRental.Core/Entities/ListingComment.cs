using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class ListingComment : Comment
    {
        public Guid RentListing { get; set; }
    }
}
