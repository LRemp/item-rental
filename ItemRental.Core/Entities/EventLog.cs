using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.Entities
{
    public class EventLog : Entity
    {
        public string Resource { get; set; }
        public string EventName { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string ? Description { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
