using ItemRental.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Core.DTOs
{
    public class VerificationRequestDTO
    {
        public Guid Id { get; set; }
        public required UserDTO User { get; set; }
        public VerificationStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
