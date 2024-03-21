using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class Comment : Entity
    {
        public Guid Author { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
