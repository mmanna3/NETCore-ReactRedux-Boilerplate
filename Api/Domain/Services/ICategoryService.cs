using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain.Models;
using Api.Services.Communication;

namespace Api.Domain.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> ListAsync();
        Task<CategoryResponse> SaveAsync(Category category);
        Task<CategoryResponse> UpdateAsync(int id, Category category);
    }
}
