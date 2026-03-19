using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Dotnet10Api.Models;

namespace Dotnet10Api.Services {
    public class JwtService {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration config) => _config = config;
        public string GenerateToken(User user) {
            var secret = _config["Jwt:Key"]!;
            var issuer = _config["Jwt:Issuer"]!;
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim("id", user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer, issuer, claims, expires: DateTime.UtcNow.AddHours(2), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}