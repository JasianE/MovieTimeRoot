using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Interfaces
{
    public interface IMovieRepository
    {
        Task<List<Movie>> GetAll();
        Task<Movie> GetMovie();
        Task<Movie> AddMovieToSeperateUser(); // we can only add movie to other people
        Task<Movie?> AddMovieToDB(string movieName); // we want to have the movie in the db first, before we can add to other users, that way we dont store duplicate movies in our db and can have a good many-to-many relationship
                                                     //User wants to recommend a movie --> calls admdmovietoDB --> calls addMovietoSeperateUser
        Task<Movie> GetMovieByName(string title);
    }
}