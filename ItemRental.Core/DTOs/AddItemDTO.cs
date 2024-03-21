using ItemRental.Core.Entities;
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
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string[]? Images { get; set; }
        public Specification[]? Details { get; set; }
    }
}
