using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dotnet10Api.Data;
using Dotnet10Api.API.DTOs;

namespace Dotnet10Api.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "CanReadUsers")]
public class UsersController : ControllerBase {
    private readonly AppDbContext _db;
    public UsersController(AppDbContext db){_db=db;}

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.Users.Select(u=>new {u.Id,u.Username,u.Role}).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id) {
        var user = await _db.Users.FindAsync(id);
        if(user==null) return NotFound();
        return Ok(new {user.Id,user.Username,user.Role});
    }

    [HttpPut("{id}"), Authorize(Policy = "CanManageUsers")]
    public async Task<IActionResult> Update(int id, UpdateUserDto input){
        var user = await _db.Users.FindAsync(id);
        if(user==null) return NotFound();
        user.Role = input.Role ?? user.Role;
        if(!string.IsNullOrWhiteSpace(input.Password))
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(input.Password);
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}"), Authorize(Policy = "CanManageUsers")]
    public async Task<IActionResult> Delete(int id){
        var user = await _db.Users.FindAsync(id);
        if(user==null) return NotFound();
        _db.Users.Remove(user); await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpGet("admin/ping"), Authorize(Policy = "CanManageUsers")]
    public IActionResult AdminPing() => Ok(new { ok = true, message = "Acceso admin concedido" });
}