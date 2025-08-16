using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Movie;
using api.Models;

namespace api.Mappers
{
    public static class MovieMappers //im going to extend the movie class, and add this feature, but its not gonna be a part of the main class cuz that bloats the code and breaks SOLID
    {
        public static GetMovieDTO ToGetMovieDto(Movie movie){
            return new GetMovieDTO
            {
                Title = movie.Title,
                OverView = movie.OverView,
                PosterPath = movie.PosterPath,
                Runtime = movie.Runtime
            };
        }
    }
}