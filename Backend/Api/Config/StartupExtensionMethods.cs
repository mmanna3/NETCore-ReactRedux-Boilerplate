using System.Text;
using Api.Core;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;
using Api.Persistence.Repositories;
using Api.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Api.Config
{
    public static class StartupExtensionMethods
    {
        public static void ConfigurarExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }

        public static void ConfigurarAutenticacionJWT(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication(x =>
                {
                    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(x =>
                {
                    x.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = async context =>
                        {
                            var userService = context.HttpContext.RequestServices.GetRequiredService<IUsuarioService>();
                            var userId = int.Parse(context.Principal.Identity.Name);
                            var usuario = await userService.GetById(userId);
                            if (usuario == null)
                            {
                                context.Fail("Usuario no autorizado");
                            }
                        }
                    };
                    x.RequireHttpsMetadata = false;
                    x.SaveToken = true;
                    x.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Secret(configuration)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        private static byte[] Secret(IConfiguration configuration)
        {
            var appSettings = configuration.GetSection("AppSettings").Get<AppSettings>();
            return Encoding.ASCII.GetBytes(appSettings.Secret);
        }

        public static void ConfigurarAppSettingsComoObjetoTipado(this IServiceCollection services, IConfiguration configuration)
        {
            var appSettingsSection = configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
        }

        public static void ConfigurarInyeccionDeDependecias(this IServiceCollection services)
        {
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<IHabitacionService, HabitacionService>();
            services.AddScoped<IHabitacionRepository, HabitacionRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<ILoggerService, LoggerService>();
        }
    }
}