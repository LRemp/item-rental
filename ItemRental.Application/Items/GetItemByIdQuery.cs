using ItemRental.Application.Abstractions.Messaging;
using ItemRental.Core.DTOs;
using ItemRental.Core.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Application.Items
{
    public sealed record GetItemByIdQuery(Guid id) : IQuery<ItemDTO>;
    public class GetItemByIdQueryHandler : IQueryHandler<GetItemByIdQuery, ItemDTO>
    {
        public Task<Result<ItemDTO>> Handle(GetItemByIdQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
