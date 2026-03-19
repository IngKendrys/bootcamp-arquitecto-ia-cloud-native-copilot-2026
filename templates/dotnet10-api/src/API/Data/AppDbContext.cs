using Microsoft.EntityFrameworkCore;
using Dotnet10Api.Models;
using Dotnet10Api.API.DTOs;

namespace Dotnet10Api.Data {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
        public DbSet<User> Users => Set<User>();
        protected override void OnModelCreating(ModelBuilder builder) {
            builder.Entity<User>().HasIndex(u => u.Username).IsUnique();
        }
    }
}