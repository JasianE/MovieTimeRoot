using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Enums;

namespace api.Models
{
    [Table("UserMovie")]
    public class UserMovie
    {
        public string AppUserId { get; set; } //for some reason dotnet id be a string by defualt
        public int MovieId { get; set; }

        //Nav properties
        public Movie Movie { get; set; }
        public AppUser AppUser { get; set; }
        public MovieStatus Status { get; set; }

    }
}