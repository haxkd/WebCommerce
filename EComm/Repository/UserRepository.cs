using EComm.Interface;
using DataAccessLayer.Models;
using BusinessLogicLayer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web.Http.Results;

namespace EComm.Repository
{
    public class UserRepository : IUsers
    {
        readonly UserLogic logic;

        public UserRepository(UserLogic logic) {
            this.logic = logic;
        }

        public void UserSignup(User user)
        {
            try
            {
                logic.UserSignup(user);
            }
            catch(Exception  e)
            {
                throw new Exception(e.ToString());
            }
        }

       
    }
}
