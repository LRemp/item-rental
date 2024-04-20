using ItemRental.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class ItemDTO
    {
        public Guid Id { get; set; }
        public string SerialNumber { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string[]? Images { get; set; }
        public string[]? Tags { get; set; }  
        public Specification[]? Details { get; set; }
    }
}
