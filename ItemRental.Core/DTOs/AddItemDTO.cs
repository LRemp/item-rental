using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class AddItemDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Images { get; set; }
    }
}
