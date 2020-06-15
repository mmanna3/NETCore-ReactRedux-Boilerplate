using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Services.Communication;

namespace Api.Core.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> ListAsync();
        Task<CategoryResponse> SaveAsync(Category category);
        Task<CategoryResponse> UpdateAsync(int id, Category category);
    }
}
