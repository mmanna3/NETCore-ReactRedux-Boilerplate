using System.Collections.Generic;
using System.Threading.Tasks;
using Hostelapp.Domain.Models;
using Hostelapp.Services.Communication;

namespace Hostelapp.Domain.Services
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> ListAsync();
        Task<CategoryResponse> SaveAsync(Category category);
        Task<CategoryResponse> UpdateAsync(int id, Category category);
    }
}
