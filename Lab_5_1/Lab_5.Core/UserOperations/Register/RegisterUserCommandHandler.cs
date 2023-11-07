﻿using Lab_5.Core.Contexts;
using Lab_5.Core.UserAuth;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab_5.Core.UserOperations.Register
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Unit>
    {
        ILab5Context _context;

        public RegisterUserCommandHandler(ILab5Context context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Surname) || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Login) || string.IsNullOrEmpty(request.Password) || string.IsNullOrEmpty(request.Phone) || (request.Variant <= 0) || string.IsNullOrEmpty(request.Group) || string.IsNullOrEmpty(request.IdCard)) {
                throw new ArgumentNullException("Enter your information!");
            }
            var transaction = (_context as Lab5Context).Database.BeginTransaction();

            try
            {
                _context.Info.Add(new UserInfos.UserInfo
                {
                    Variant = request.Variant,
                    Group = request.Group
                    ,
                    IdCard = request.IdCard,
                    Name = request.Name,
                    Patronymic = request.Patronymic,
                    Phone = request.Phone
                    ,
                    Surname = request.Surname
                });
                await _context.SaveChangesAsync();
                _context.AuthTable.Add(new AuthUsers
                {
                    IdInfo = _context.Info.Where(i => i.IdCard.Equals(request.IdCard)).First().Id
                    ,
                    Login = request.Login,
                    Password = request.Password,
                    Role = RoleType.User
                });
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new ApplicationException(ex.Message);
            }
            return Unit.Value;
        }
    }
}
