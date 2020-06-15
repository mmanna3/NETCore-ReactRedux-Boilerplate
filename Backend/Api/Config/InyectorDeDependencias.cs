using Api.Domain.Repositories;
using Api.Domain.Services;
using Api.Persistence.Repositories;
using Api.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Api.Config
{
    public class InyectorDeDependencias
    {
        public static void Inyectar(IServiceCollection services)
        {
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<ILoggerService, LoggerService>();
        }
    }
}