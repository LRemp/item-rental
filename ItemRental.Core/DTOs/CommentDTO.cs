using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class CommentDTO
    {
        public Guid Id { get; set; }
        public UserDTO Author { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
