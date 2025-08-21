using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Enums;

namespace api.DTOs.Movie
{
    public class UserMovieMovie
    {
        public string Title { get; set; }
        public string OverView { get; set; }
        public string PosterPath { get; set; }
        public string Runtime { get; set; }
        public int Id { get; set; }
        public MovieStatus Status { get; set; }
    }
}