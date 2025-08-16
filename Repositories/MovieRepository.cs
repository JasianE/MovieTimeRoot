using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDBContext _context;
        public MovieRepository(ApplicationDBContext context)
        {
            _context = context; // abstract and allow dependency injection to do its thang
        }
        public Task<Movie> AddMovieToDB()
        {
            throw new NotImplementedException();
        }

        public Task<Movie> AddMovieToSeperateUser()
        {
            throw new NotImplementedException();
        }

        public async Task<List<Movie>> GetAll()
        {
            return await _context.Movies.ToListAsync();
        }

        public Task<Movie> GetMovie()
        {
            throw new NotImplementedException();
        }
    }
}