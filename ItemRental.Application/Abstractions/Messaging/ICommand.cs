﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ItemRental.Services.Extensions.Messaging
{
    public interface ICommand : IBaseCommand
    {
    }
    public interface ICommand<TResponse> : IBaseCommand
    {

    }
    public interface IBaseCommand
    {

    }
}
