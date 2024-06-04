using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class Specification
    {
        public required string Label { get; set; }
        public required string Name { get; set; }
        public required string Value { get; set; }
    }
}
