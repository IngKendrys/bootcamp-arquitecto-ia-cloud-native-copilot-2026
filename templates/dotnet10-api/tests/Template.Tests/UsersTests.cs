using Xunit;
using Dotnet10Api.API.Controllers;
using Dotnet10Api.API.DTOs;
using Dotnet10Api.Data;
using Dotnet10Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Template.Tests;

public class AuthControllerTests {
    private AppDbContext CreateDbContext() {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        return new AppDbContext(options);
    }

    private JwtService GetJwtService() {
        var dict = new Dictionary<string, string?> {
            ["Jwt:Key"] = "super-secreto-12345678901234567890",
            ["Jwt:Issuer"] = "test-api"
        };
        var config = new ConfigurationBuilder().AddInMemoryCollection(dict).Build();
        return new JwtService(config);
    }

    [Fact]
    public async Task Register_WithValidInput_ReturnsOkWithUserId() {
        var db = CreateDbContext();
        var jwtService = GetJwtService();
        var controller = new AuthController(db, jwtService);

        var result = await controller.Register(new RegisterDto("newuser", "Password123"));

        Assert.IsType<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.NotNull(okResult);
        Assert.Equal(200, okResult.StatusCode);
    }

    [Fact]
    public async Task Register_WithDuplicateUsername_ReturnsBadRequest() {
        var db = CreateDbContext();
        var jwtService = GetJwtService();
        var controller = new AuthController(db, jwtService);

        await controller.Register(new RegisterDto("duplicate", "Password123"));
        var result = await controller.Register(new RegisterDto("duplicate", "Password123"));

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsOkWithToken() {
        var db = CreateDbContext();
        var jwtService = GetJwtService();
        var controller = new AuthController(db, jwtService);

        await controller.Register(new RegisterDto("testuser", "Password123"));
        var loginResult = await controller.Login(new LoginDto("testuser", "Password123"));

        Assert.IsType<OkObjectResult>(loginResult);
        var okResult = loginResult as OkObjectResult;
        Assert.NotNull(okResult.Value);
        Assert.Contains("token", okResult.Value.ToString()!);
    }

    [Fact]
    public async Task Login_WithInvalidPassword_ReturnsUnauthorized() {
        var db = CreateDbContext();
        var jwtService = GetJwtService();
        var controller = new AuthController(db, jwtService);

        await controller.Register(new RegisterDto("testuser", "CorrectPassword"));
        var loginResult = await controller.Login(new LoginDto("testuser", "WrongPassword"));

        Assert.IsType<UnauthorizedObjectResult>(loginResult);
    }
}

public class UsersControllerTests {
    private AppDbContext CreateDbContext() {
        var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;
        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetAll_ReturnsListOfUsers() {
        var db = CreateDbContext();
        var user = new Dotnet10Api.Models.User { 
            Username = "testuser", 
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            Role = "User"
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var controller = new UsersController(db);
        var result = await controller.GetAll();

        Assert.IsType<OkObjectResult>(result);
        var okResult = result as OkObjectResult;
        Assert.NotNull(okResult.Value);
    }

    [Fact]
    public async Task Get_WithValidId_ReturnsUser() {
        var db = CreateDbContext();
        var user = new Dotnet10Api.Models.User { 
            Username = "testuser", 
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            Role = "User"
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var controller = new UsersController(db);
        var result = await controller.Get(user.Id);

        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task Get_WithInvalidId_ReturnsNotFound() {
        var db = CreateDbContext();
        var controller = new UsersController(db);

        var result = await controller.Get(999);

        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task Delete_WithValidId_ReturnsNoContent() {
        var db = CreateDbContext();
        var user = new Dotnet10Api.Models.User { 
            Username = "testuser", 
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            Role = "User"
        };
        db.Users.Add(user);
        await db.SaveChangesAsync();

        var controller = new UsersController(db);
        var result = await controller.Delete(user.Id);

        Assert.IsType<NoContentResult>(result);
        var deletedUser = await db.Users.FindAsync(user.Id);
        Assert.Null(deletedUser);
    }
}