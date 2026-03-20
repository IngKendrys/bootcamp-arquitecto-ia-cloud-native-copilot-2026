using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dotnet10Api.Data;
using Dotnet10Api.Models;
using Dotnet10Api.API.DTOs;
using Dotnet10Api.Services;
using Microsoft.EntityFrameworkCore;

namespace Dotnet10Api.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase {
    private readonly AppDbContext _db;
    private readonly JwtService _jwt;
    public AuthController(AppDbContext db, JwtService jwt){_db=db;_jwt=jwt;}

    [HttpPost("register"), Authorize(Policy = "CanManageUsers")]
    public async Task<IActionResult> Register(RegisterDto input) {
        if (await _db.Users.AnyAsync(u => u.Username == input.Username)) return BadRequest("Usuario existe");
        var user = new User { Username = input.Username, PasswordHash = BCrypt.Net.BCrypt.HashPassword(input.Password) };
        _db.Users.Add(user); await _db.SaveChangesAsync();
        return Ok(new { user.Id, user.Username });
    }

    [HttpPost("login"), AllowAnonymous]
    public async Task<IActionResult> Login(LoginDto input){
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Username == input.Username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(input.Password, user.PasswordHash))
            return Unauthorized("Credenciales inválidas");
        return Ok(new { token = _jwt.GenerateToken(user) });
    }
}