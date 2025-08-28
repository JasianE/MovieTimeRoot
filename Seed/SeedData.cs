using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Seed
{
    public class SeedData
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;

        public SeedData(ApplicationDBContext context, UserManager<AppUser> userManager)
        {
            //Iservice provider gives access to services registed in program.cs, like dbcontext
            _context = context;
            _userManager = userManager;
        }

        public async Task InitializeAsync()
        {
            if (!_context.Movies.Any())
            {
                var movies = new List<Movie>
            {
                new Movie { Title = "The Shawshank Redemption", OverView = "Imprisoned...", PosterPath = "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", Runtime = "142 min" },
                new Movie { Title = "The Godfather", OverView = "The aging patriarch...", PosterPath = "/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg", Runtime = "175 min" },
                // ... add more movies here, ideally top 100
            };

            _context.Movies.AddRange(movies);
            await _context.SaveChangesAsync();
            }
        }

        
    }
}