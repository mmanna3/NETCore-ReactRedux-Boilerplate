using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Api.Persistence.Contexts;
using FluentAssertions;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;

namespace Api.IntegrationTests.Controllers
{
    public class HuespedControllerShould
    {
        private TestServer _server;
        private HttpClient _httpClient;
        
        [SetUp]
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
                context.Database.EnsureCreated();
            }

            _httpClient = _server.CreateClient();
        }

        [Test]
        public async Task ReturnAll()
        {
            var response = await _httpClient.GetAsync("/api/categories");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}