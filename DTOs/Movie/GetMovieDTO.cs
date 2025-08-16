using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Movie
{
    public class GetMovieDTO
    {
        [Required]
        public string Title { get; set; }
        public string OverView { get; set; } = string.Empty;
        public string PosterPath { get; set; } = string.Empty;
        public string Runtime { get; set; } = string.Empty;
    }
}