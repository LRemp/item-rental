using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class CategoryDTO
    {
        public Guid? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string? Parent { get; set; }
        public List<CategoryScheme>? Scheme { get; set; }
    }
    public class CategoryScheme
    {
        public string Name { get; set; } = string.Empty;
        public string Label { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int? Min { get; set; }
        public int? Max { get; set; }
        public List<string>? Options { get; set; }
    }
}
