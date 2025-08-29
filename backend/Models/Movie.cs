using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Movie")]
    public class Movie
    {
        //Will fetch a movie from TMDB each time and store it in the DB,
        // Then will have a join table for the movie to the user, in order to store the relationship between
        //Them, then you can add stuff like recommendations and comments, but first MVP
        public string Title { get; set; } = string.Empty;
        public string OverView { get; set; } = string.Empty;
        public string PosterPath { get; set; } = string.Empty;
        public string Runtime { get; set; } = string.Empty;
        public List<UserMovie> UserMovies { get; set; } = new List<UserMovie>();
        public int Id { get; set; }

    }
}