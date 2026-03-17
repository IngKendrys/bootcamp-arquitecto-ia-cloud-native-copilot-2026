using Domain;using Microsoft.EntityFrameworkCore;
namespace Infrastructure{
  public class AppDb:DbContext{
    public AppDb(DbContextOptions<AppDb> o):base(o){}
    public DbSet<User> Users => Set<User>();
  }
}
