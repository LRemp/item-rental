using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class ListingCommentDTO : CommentDTO
    {
        public RentListingDTO RentListing { get; set; }
    }
}
