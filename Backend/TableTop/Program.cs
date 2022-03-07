using Microsoft.Extensions.FileProviders;
using TableTop;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
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

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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