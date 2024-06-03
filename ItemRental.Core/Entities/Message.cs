using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public required string Resource { get; set; }
        public required Guid Author {  get; set; }
        public required string Text { get; set; }
        public DateTime Created { get; set; }
    }
}
