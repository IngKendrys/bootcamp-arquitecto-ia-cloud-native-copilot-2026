using Microsoft.AspNetCore.Authentication.JwtBearer;using Microsoft.IdentityModel.Tokens;
public static class AuthExtensions{
  public static IServiceCollection AddJwtAuth(this IServiceCollection s, IConfiguration c){
    var authority=c["Jwt:Authority"]; var audience=c["Jwt:Audience"];
    s.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(o=>{o.Authority=authority; o.Audience=audience; o.TokenValidationParameters=new TokenValidationParameters{ValidateIssuer=true,ValidateAudience=true};});
    s.AddAuthorization(o=>{
      o.AddPolicy("IsAdmin",p=>p.RequireClaim("role","admin"));
    });
    return s;
  }
}
