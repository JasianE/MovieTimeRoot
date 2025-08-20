using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.User;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<List<UserDTO>> GetAllUsers();
        Task<UserDTO> GetUserByUserName(string username);
    };
}