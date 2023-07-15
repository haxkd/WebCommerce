using DataAccessLayer.Data;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class UserLogic
    {
        readonly DatabaseContext _context;

        public UserLogic(DatabaseContext dbContext)
        {
            _context = dbContext;
        }
        public void UserSignup(User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception(e.ToString());
            }
        }
        public bool checkUser(User user)
        {
            User? users = _context.Users.FirstOrDefault(x => x.uemail == user.uemail || x.umobile == user.umobile);
            if (users != null)
            {
                return true;
            }
            else
            { 
                return false; 
            }
        }
        public async Task<User> GetUser(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.uemail == email && u.upassword == password && u.isAdmin != "true");
        }

        public async Task<User> GetAdmin(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.uemail == email && u.upassword == password && u.isAdmin == "true");
        }
    }
}
