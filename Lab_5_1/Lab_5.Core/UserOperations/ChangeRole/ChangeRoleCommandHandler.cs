using Lab_5.Core.Contexts;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab_5.Core.UserOperations.ChangeRole
{
    public class ChangeRoleCommandHandler : IRequestHandler<ChangeRoleCommand, Unit>
    {
        private readonly ILab5Context _context;

        public ChangeRoleCommandHandler(ILab5Context context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(ChangeRoleCommand request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(request.Info.Surname) || string.IsNullOrEmpty(request.Info.Name) || string.IsNullOrEmpty(request.Info.Phone) || (request.Info.Variant <= 0) || string.IsNullOrEmpty(request.Info.Group) || string.IsNullOrEmpty(request.Info.IdCard))
            {
                throw new ArgumentNullException("Enter your information!");
            }
            using (var transaction = (_context as Lab5Context).Database.BeginTransaction())
            {
                try
                {
                    var user = await _context.AuthTable
                        .Where(a => a.Login.Equals(request.Login))
                        .FirstAsync();

                    user.Role = request.NewRole;
                    await _context.SaveChangesAsync();

                    var userInfo = await _context.Info.Where(inf => inf.Id == request.Info.Id).FirstAsync();
                    userInfo.Surname = request.Info.Surname;
                    userInfo.Phone = request.Info.Phone;
                    userInfo.Variant = request.Info.Variant;
                    userInfo.Patronymic = request.Info.Patronymic;
                    userInfo.Group = request.Info.Group;
                    userInfo.IdCard = request.Info.IdCard;
                    userInfo.Name = request.Info.Name;
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
            return Unit.Value;
        }
    }
}
