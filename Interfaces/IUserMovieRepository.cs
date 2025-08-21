using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Movie;
using api.DTOs.User;
using api.DTOs.UserMovie;
using api.Models;

namespace api.Interfaces
{
    public interface IUserMovieRepository
    {
        Task<List<UserMovieMovie>> GetUserMovies(AppUser user);
        Task<string> AddUserMovie(UserMovie userMovie);
        Task<UpdateUserMovieDTO> ChangeMovieStatus(AppUser user, UserMovieMovie movie, int status);
    }
}