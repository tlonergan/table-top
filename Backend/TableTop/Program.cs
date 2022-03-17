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

string corsPolicyName = "ClientPermissions";
services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName,
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
             options.IncludeErrorDetails = true;
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

app.UseCors(corsPolicyName);

app.UseAuthentication();
app.UseAuthorization();

PhysicalFileProvider physicalFileProvider = new(Path.Combine(Directory.GetCurrentDirectory(), "App"));
app.UseFileServer(new FileServerOptions
{
    FileProvider = physicalFileProvider,
    RequestPath = string.Empty,
    EnableDefaultFiles = true,
    EnableDirectoryBrowsing = false
});

app.MapFallbackToFile("index.html", new StaticFileOptions { FileProvider = physicalFileProvider, RequestPath = string.Empty });

app.MapControllers();
app.MapHub<BoardHub>("/board-hub");

app.Run();