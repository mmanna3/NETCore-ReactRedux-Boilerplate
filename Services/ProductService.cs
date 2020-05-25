using System.Collections.Generic;
using System.Threading.Tasks;
using Hostelapp.Domain.Models;
using Hostelapp.Domain.Repositories;
using Hostelapp.Domain.Services;

namespace Hostelapp.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> ListAsync()
        {
            return await _productRepository.ListAsync();
        }
    }
}
