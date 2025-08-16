using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.User
{
    public class LoginDTO
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
   }
}