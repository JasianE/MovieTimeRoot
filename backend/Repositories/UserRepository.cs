using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.User;
using api.Interfaces;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        public Task<List<UserDTO>> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<UserDTO> GetUserByUserName(string username)
        {
            throw new NotImplementedException();
        }
    }
}