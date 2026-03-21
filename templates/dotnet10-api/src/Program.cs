using Dotnet10Api.Data;
using Dotnet10Api.Models;
using Dotnet10Api.Services;
using Application;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Text;
using Prometheus;

var builder = WebApplication.CreateBuilder(args);

const string CorsPolicy = "AngularDevCors";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<JwtService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = "DynamicJwt";
    options.DefaultChallengeScheme = "DynamicJwt";
})
.AddPolicyScheme("DynamicJwt", "Selector entre JWT local y OIDC", options =>
{
    options.ForwardDefaultSelector = context =>
    {
        var authorization = context.Request.Headers.Authorization.ToString();
        if (!authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
        {
            return "LocalJwt";
        }

        var token = authorization["Bearer ".Length..].Trim();
        if (string.IsNullOrWhiteSpace(token))
        {
            return "LocalJwt";
        }

        try
        {
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);
            var oidcAuthority = builder.Configuration["Oidc:Authority"];

            if (!string.IsNullOrWhiteSpace(oidcAuthority) &&
                jwt.Issuer.StartsWith(oidcAuthority, StringComparison.OrdinalIgnoreCase))
            {
                return "OidcJwt";
            }
        }
        catch
        {
        }

        return "LocalJwt";
    };
})
.AddJwtBearer("LocalJwt", options => {
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
        NameClaimType = JwtRegisteredClaimNames.Sub,
        RoleClaimType = ClaimTypes.Role
    };
})
.AddJwtBearer("OidcJwt", options =>
{
    options.RequireHttpsMetadata = builder.Configuration.GetValue<bool>("Oidc:RequireHttpsMetadata", false);
    options.Authority = builder.Configuration["Oidc:Authority"];
    options.Audience = builder.Configuration["Oidc:Audience"];
    options.MapInboundClaims = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        NameClaimType = "preferred_username",
        RoleClaimType = ClaimTypes.Role
    };

    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = context =>
        {
            if (context.Principal?.Identity is not ClaimsIdentity identity)
            {
                return Task.CompletedTask;
            }

            foreach (var roleClaim in context.Principal.FindAll("roles"))
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, roleClaim.Value));
            }

            foreach (var roleClaim in context.Principal.FindAll("role"))
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, roleClaim.Value));
            }

            var realmAccess = context.Principal.FindFirst("realm_access")?.Value;
            if (!string.IsNullOrWhiteSpace(realmAccess))
            {
                try
                {
                    using var json = JsonDocument.Parse(realmAccess);
                    if (json.RootElement.TryGetProperty("roles", out var roles) && roles.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var role in roles.EnumerateArray())
                        {
                            if (role.ValueKind == JsonValueKind.String && !string.IsNullOrWhiteSpace(role.GetString()))
                            {
                                identity.AddClaim(new Claim(ClaimTypes.Role, role.GetString()!));
                            }
                        }
                    }
                }
                catch
                {
                }
            }

            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("CanReadUsers", policy =>
        policy.RequireAssertion(context =>
            context.User.Claims.Any(claim =>
                claim.Type == ClaimTypes.Role &&
                (string.Equals(claim.Value, "admin", StringComparison.OrdinalIgnoreCase) ||
                 string.Equals(claim.Value, "reader", StringComparison.OrdinalIgnoreCase)))));

    options.AddPolicy("CanManageUsers", policy =>
        policy.RequireAssertion(context =>
            context.User.Claims.Any(claim =>
                claim.Type == ClaimTypes.Role &&
                string.Equals(claim.Value, "admin", StringComparison.OrdinalIgnoreCase))));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    await Seed.InitAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpMetrics();
app.UseHttpsRedirection();
app.UseCors(CorsPolicy);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapMetrics("/metrics");

app.Run();