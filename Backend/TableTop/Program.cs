using Microsoft.Extensions.FileProviders;
using TableTop;
using TableTop.Entities.Configuration;
using TableTop.Service;
using TableTop.Storage;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

IServiceCollection services = builder.Services;

services.AddSingleton<Settings>();
ServiceRegistrar.Register(services);
StorageRegistrar.Register(services);

services.AddControllers();
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

app.UseAuthorization();

PhysicalFileProvider physicalFileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "App"));
var contents = physicalFileProvider.GetDirectoryContents(string.Empty);
Console.WriteLine("Files in './App'");
foreach (IFileInfo content in contents)
{
    Console.WriteLine(content.Name);
}

StaticFileOptions staticFileOptions = new StaticFileOptions { FileProvider = physicalFileProvider, RequestPath = "" };
app.UseStaticFiles(staticFileOptions);

app.MapControllers();
app.MapHub<BoardHub>("/board-hub");

app.Run();