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
    public class HuespedControllerShould : BaseControllerTest
    {
        [Test]
        public async Task ReturnAll()
        {
            var response = await _httpClient.GetAsync("/api/categories");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}