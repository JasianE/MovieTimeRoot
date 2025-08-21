
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.User;
using api.Interfaces;
using api.Models;
using api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserMovieRepository _userMovieRepo;
        public UserController(UserManager<AppUser> userManager, IUserMovieRepository userMovieRepo)
        {
            _userManager = userManager;
            _userMovieRepo = userMovieRepo;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllUsers()
        {
            //Add pagination
            
            List<AppUser> users = await _userManager.Users.ToListAsync();
            var DTOs = users.Select(user => new UserDTO
            {
                UserName = user.UserName,
                ID = user.Id
            });

            return Ok(DTOs);
        }

        [HttpGet("username")]

        public async Task<IActionResult> GetUserByUserName(string userName)
        {
            AppUser? appUser = await _userManager.FindByNameAsync(userName);
            if (appUser == null)
            {
                return NotFound("User does not exist");
            }
            else
            {
                UserDTO appUserDTO = new UserDTO
                {
                    UserName = appUser.UserName,
                    ID = appUser.Id
                };
                return Ok(appUserDTO);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserByID(string id)
        { //only once you get the id can you use this, which will also return the movies the user has, for sepearte page (maybe convoluted)
            AppUser? appUser = await _userManager.FindByIdAsync(id);
            if (appUser == null)
            {
                return NotFound("User does not exist");
            }
            else
            {
                List<Movie> moviesOfUser = await _userMovieRepo.GetUserMovies(appUser);
                UserWithUserMovies appUserDTO = new UserWithUserMovies
                {
                    UserName = appUser.UserName,
                    ID = appUser.Id,
                    UserMovies = moviesOfUser
                };
                return Ok(appUserDTO);
            }
        }
    }
}