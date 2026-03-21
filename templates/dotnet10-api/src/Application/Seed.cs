using Dotnet10Api.Data;
using Dotnet10Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Application;

public static class Seed
{
    public static async Task InitAsync(AppDbContext db)
    {
        var usersToSeed = new[]
        {
            new { Username = "admin", Password = "Password123", Role = "Admin", IsActive = true },
            new { Username = "reader", Password = "Password123", Role = "Reader", IsActive = true }
        };

        foreach (var userSeed in usersToSeed)
        {
            var existing = await db.Users.SingleOrDefaultAsync(u => u.Username == userSeed.Username);
            if (existing is null)
            {
                db.Users.Add(new User
                {
                    Username = userSeed.Username,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(userSeed.Password),
                    Role = userSeed.Role,
                    IsActive = userSeed.IsActive,
                    CreatedAt = DateTime.UtcNow
                });
                continue;
            }

            existing.Role = userSeed.Role;
            existing.IsActive = userSeed.IsActive;
            if (!BCrypt.Net.BCrypt.Verify(userSeed.Password, existing.PasswordHash))
            {
                existing.PasswordHash = BCrypt.Net.BCrypt.HashPassword(userSeed.Password);
            }
        }

        await db.SaveChangesAsync();
    }
}
