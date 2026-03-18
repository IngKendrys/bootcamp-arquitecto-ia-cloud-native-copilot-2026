using Domain;using Microsoft.EntityFrameworkCore;
namespace Infrastructure{
  public class AppDbContext : DbContext{
    public AppDbContext(DbContextOptions<AppDbContext> o):base(o){}
    public DbSet<User> Users => Set<User>();
  }
}
