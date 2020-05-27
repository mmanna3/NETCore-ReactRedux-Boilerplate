using AutoMapper;
using Hostelapp.Controllers.Resources;
using Hostelapp.Domain.Models;
using Hostelapp.Extensions;

namespace Hostelapp.Controllers.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Category, CategoryResource>();

            CreateMap<Product, ProductResource>()
                .ForMember(src => src.UnitOfMeasurement,
                    opt => opt.MapFrom(src => src.UnitOfMeasurement.ToDescriptionString()));
        }
    }
}
