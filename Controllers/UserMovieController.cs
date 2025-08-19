using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Route = Microsoft.AspNetCore.Mvc.RouteAttribute;
namespace api.Controllers
{
    [Route("api/usermovie")]
    [ApiController]
    public class UserMovieController : ControllerBase // because of controller base we have a user object w/ 3 props
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMovieRepository _movieRepo;
        private readonly IUserMovieRepository _userMovieRepo;

        public UserMovieController(UserManager<AppUser> userManager, IMovieRepository movieRepo, IUserMovieRepository userMovieRepo)
        {
            _userManager = userManager;
            _movieRepo = movieRepo;
            _userMovieRepo = userMovieRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserMovies()
        {
            string username = User.GetUserName();
            AppUser appUser = await _userManager.FindByNameAsync(username);
            var movies = await _userMovieRepo.GetUserMovies(appUser);
            return Ok(movies);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateUserMovie(string movieName, string userName) //name from other user
        {
            AppUser? appUser = await _userManager.FindByNameAsync(userName);
            Movie? movie = await _movieRepo.GetMovieByName(movieName);
            if (movie == null)
            {
                return BadRequest("Movie does not exist in DB.");
            }
            if (appUser == null)
            {
                return BadRequest("User does not exist.");
            }

            var userMovies = await _userMovieRepo.GetUserMovies(appUser);

            if (userMovies.Any(e => e.Title.ToLower() == movieName.ToLower()))
            {
                return BadRequest("User already has this movie added.");
            }

            UserMovie newUserMovie = new UserMovie
            {
                AppUserId = appUser.Id,
                MovieId = movie.Id
            };

            string result = await _userMovieRepo.AddUserMovie(newUserMovie);

            if (newUserMovie == null)
            {
                return BadRequest("Could not be created");
            }
            else
            {
                return Ok(result);
            }
        }
        [HttpPut("/update")]
        [Authorize]

        public async Task<IActionResult> ChangeMovieStatus(string MovieTitle, [FromRoute] int status)
        {
            string userName = User.GetUserName(); // we get the username from the user object that exists due to controller base logged in
            AppUser? appUser = await _userManager.FindByNameAsync(userName);

            //Query through all of the appUsers usermovies, and find the one with the same movie title
            //if null return not found, if found then update it and call the movie repo
            var userMovies = await _userMovieRepo.GetUserMovies(appUser);
            Movie? itemOfInterest = userMovies.FirstOrDefault(item => item.Title.ToLower() == MovieTitle.ToLower());
            
            if (itemOfInterest == null)
            {
                return BadRequest("Movie not found.");
            }
            else
            {
                var result = await _userMovieRepo.ChangeMovieStatus(appUser, itemOfInterest, status);
                return Ok(result);
            }
        }
    }
}