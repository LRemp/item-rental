using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class ItemDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string[] Tags { get; set; }  
    }
}
