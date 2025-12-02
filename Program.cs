using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var browserPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser");

app.UseDefaultFiles(new DefaultFilesOptions { FileProvider = new PhysicalFileProvider(browserPath) });
app.UseStaticFiles(new StaticFileOptions { FileProvider = new PhysicalFileProvider(browserPath) });

app.UseHttpsRedirection();

app.Run();

