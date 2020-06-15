using System;
using System.IO;
using System.Text;
using Api.Config;
using AutoMapper;
using Api.Persistence.Contexts;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NLog;

namespace Api
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
            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });

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
            LogManager.LoadConfiguration($"{Directory.GetCurrentDirectory()}/nlog.config");

            dbContext.Database.Migrate();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
                app.UseCors(builder =>
                    builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                );
            }

            app.ConfigureCustomExceptionMiddleware();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp/build";
            });
        }
    }
}
