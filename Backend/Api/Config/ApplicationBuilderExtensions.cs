using Microsoft.AspNetCore.Builder;

namespace Api.Config
{
    public static class ApplicationBuilderExtensions
    {
        public static void ConfigurarExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
