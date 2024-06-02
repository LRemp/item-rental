using Azure;
using Azure.Communication.Email;
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
        private bool initialized = false;
        private EmailClient emailClient;
        public EmailService(IConfiguration configuration) {
            this.emailClient = new EmailClient(configuration["EmailServiceConnectionString"]);
            this.initialized = true;
        }
        public void SendEmail(Email email)
        {
            if (!initialized || emailClient is null)
            {
                
                throw new InvalidOperationException("Email service not initialized");
            }
            EmailSendOperation emailSendOperation = emailClient.Send(
                WaitUntil.Started,
                senderAddress: "DoNotReply@bead29e0-a40e-4714-a3a5-d590f17ea26a.azurecomm.net",
                recipientAddress: email.Address,
                subject: email.Subject,
                htmlContent: @"
                <html>
                <body>
                    <h1>Welcome to Azure Communication Services!</h1>
                    <p>This email is sent using <b>Azure.Communication.Email</b> client library.</p>
                    <p>Here is an example of HTML content in an email.</p>
                </body>
                </html>",
                plainTextContent: email.PlainTextContent);
        }

    }
}
