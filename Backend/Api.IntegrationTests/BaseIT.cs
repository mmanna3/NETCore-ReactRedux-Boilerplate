using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Persistence.Contexts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using Respawn;

namespace Api.IntegrationTests
{
    public class BaseIT
    {
        protected TestServer _server;
        protected HttpClient _httpClient;
        
        [OneTimeSetUp]
        public void Setup()
        {
            var projectDir = Directory.GetCurrentDirectory();
            var configPath = Path.Combine(projectDir, "appsettings.json");
            var webHostBuilder = WebHost.CreateDefaultBuilder().UseStartup<Startup>().ConfigureAppConfiguration((context, conf) =>
            {
                conf.AddJsonFile(configPath);
            });

            _server = new TestServer(webHostBuilder);

            using (var scope = _server.Services.CreateScope())
            using (var context = scope.ServiceProvider.GetService<AppDbContext>())
            {
                context.Database.Migrate();
            }

            _httpClient = _server.CreateClient();
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            using (var scope = _server.Services.CreateScope())
            await using (var context = scope.ServiceProvider.GetService<AppDbContext>())
            {
                var checkpoint = new Checkpoint();
                await checkpoint.Reset(context.Database.GetDbConnection().ConnectionString);
            }


        }
    }
}