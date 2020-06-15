using System.Text;
using Api.Config;
using Api.Controllers;
using Api.Persistence.Contexts;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.IntegrationTests
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddApplicationPart(typeof(BaseController).Assembly);

            services.AddDbContext<AppDbContext>(options => { options.UseSqlServer(Configuration["ConnectionStrings:Default"]); });

            ConfigurarAppSettingsComoObjetoTipado(services);

            var secret = ObtenerSecret();
            ConfiguradorDeAutentitacionJWT.Configurar(services, secret);

            InyectorDeDependencias.Inyectar(services);

            services.AddAutoMapper(typeof(Startup));
        }

        private byte[] ObtenerSecret()
        {
            var appSettings = Configuration.GetSection("AppSettings").Get<AppSettings>();
            return Encoding.ASCII.GetBytes(appSettings.Secret);
        }

        private void ConfigurarAppSettingsComoObjetoTipado(IServiceCollection services)
        {
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppDbContext dbContext)
        {
            dbContext.Database.Migrate();
            
            app.ConfigureCustomExceptionMiddleware();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
