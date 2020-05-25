using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Hostelapp.Domain.Models;
using Hostelapp.Domain.Services;
using Hostelapp.Resources;
using Microsoft.AspNetCore.Mvc;

namespace Hostelapp.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductsController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductResource>> ListAsync()
        {
            var products = await _productService.ListAsync();
            var resources = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductResource>>(products);
            return resources;
        }
    }
}
