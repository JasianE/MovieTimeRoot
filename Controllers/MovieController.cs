using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;
using api.DTOs.Movie;

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
        [HttpGet]
        public async Task<IActionResult> GetAllMovies()
        {
            List<Movie> Movies = await _movieRepo.GetAll();
            List<GetMovieDTO> MovieDTOs = Movies.Select(movie => MovieMappers.ToGetMovieDto(movie)).ToList();
            return Ok(MovieDTOs);
        }
    }
}