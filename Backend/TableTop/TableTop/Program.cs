
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

app.MapControllers();
app.MapHub<BoardHub>("/board-hub");

app.Run();