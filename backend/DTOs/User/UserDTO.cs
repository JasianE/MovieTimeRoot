using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.DTOs.User
{
    public class UserDTO
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string ID { get; set; }
    }
}