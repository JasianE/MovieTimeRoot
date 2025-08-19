using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Enums;

namespace api.DTOs.UserMovie
{
    public class UpdateUserMovieDTO
    {
        public string AppUserId { get; set; }
        public int MovieId { get; set; }

        public MovieStatus Status { get; set; }
    }
}