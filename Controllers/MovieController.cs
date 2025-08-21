using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;
using api.DTOs.Movie;
using RestSharp;
using Microsoft.AspNetCore.Authorization;
using api.Helpers;

namespace api.Controllers
{
    [Route("/api/movie")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepo;
        public MovieController(IMovieRepository movieRepo)
        {
            _movieRepo = movieRepo;
        }
        [HttpGet("all")]

        public async Task<IActionResult> GetAllMovies([FromQuery] QueryObject query)
        {
            List<Movie> Movies = await _movieRepo.GetAll(query);
            List<GetMovieDTO> MovieDTOs = Movies.Select(movie => MovieMappers.ToGetMovieDto(movie)).ToList();
            return Ok(MovieDTOs);
        }
        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddMovieToDB([FromQuery] string MovieTitle)
        {
            Movie? movie = await _movieRepo.AddMovieToDB(MovieTitle);
            if (movie == null)
            {
                return BadRequest("Movie already exists.");
            }
            return Ok(movie);
        }
    }
}