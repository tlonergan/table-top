using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.FileProviders;
using TableTop;
using TableTop.Authorization;
using TableTop.Entities.Authorization;
using TableTop.Entities.Configuration;
using TableTop.Service;
using TableTop.Storage;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

IServiceCollection services = builder.Services;

services.AddSingleton<Settings>();
services.AddSingleton<IAuthorizationHandler, HasScopeHandler>();

ServiceRegistrar.Register(services);
StorageRegistrar.Register(services);

services.AddControllers()
        .ConfigureApiBehaviorOptions(options =>
         {
             options.SuppressModelStateInvalidFilter = true;
         });

services.AddSignalR();

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddCors(options =>
{
    options.AddPolicy("ClientPermissions",
                      policy =>
                      {
                          policy.AllowAnyHeader()
                                .AllowAnyMethod()
                                .WithOrigins("http://localhost:3000")
                                .AllowCredentials();
                      });
});

string authenticationDomain = builder.Configuration["AUTHENTICATION_AUTHORITY"];
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
         {
             options.Authority = authenticationDomain;
             options.Audience = builder.Configuration["AUTHENTICATION_AUDIENCE"];
         });

services.AddAuthorization(options =>
{
    foreach (string supportedScope in AuthorizationScopes.AllScopes)
    {
        options.AddPolicy(supportedScope, policy => policy.Requirements.Add(new HasScopeRequirement(authenticationDomain, supportedScope)));
    }
});

builder.Configuration.AddEnvironmentVariables();

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

Settings? settings = app.Services.GetService<Settings>();
app.Configuration.Bind(settings);

app.UseHttpsRedirection();

app.UseCors("ClientPermissions");

app.UseAuthentication();
app.UseAuthorization();

PhysicalFileProvider physicalFileProvider = new(Path.Combine(Directory.GetCurrentDirectory(), "App"));
StaticFileOptions staticFileOptions = new() { FileProvider = physicalFileProvider, RequestPath = "" };
app.UseStaticFiles(staticFileOptions);

app.MapControllers();
app.MapHub<BoardHub>("/board-hub");

app.Run();