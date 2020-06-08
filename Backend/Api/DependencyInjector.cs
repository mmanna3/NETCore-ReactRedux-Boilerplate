using Api.Domain.Repositories;
using Api.Domain.Services;
using Api.Persistence.Repositories;
using Api.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Api
{
    public class DependencyInjector
    {
        public static void AddScopedForDependencyInjection(IServiceCollection services)
        {
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();

            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductRepository, ProductRepository>();

            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}