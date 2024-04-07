using ItemRental.Core.Contracts;
using ItemRental.Core.Entities;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Services
{
    public class EmailService : IEmailService
    {
        private bool Initialized = false;
        public EmailService() { }
        public EmailService(IConfiguration configuration) { 
        }
        public void SendEmail(Email email)
        {
            if (!Initialized)
            {
                throw new InvalidOperationException("Email service not initialized");
            }
        }
    }
}
