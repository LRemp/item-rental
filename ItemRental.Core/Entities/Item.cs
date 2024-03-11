using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class Item : Entity
    {
        public Guid Owner { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string[] Tags { get; set; } = new string[0];
        public string[] Photos { get; set; } = new string[0];
        public Object? Specification { get; set; }
    }
}
