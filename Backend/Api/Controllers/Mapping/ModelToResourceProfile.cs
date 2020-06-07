using AutoMapper;
using Api.Controllers.Resources;
using Api.Controllers.Resources.Usuario;
using Api.Domain.Models;
using Api.Extensions;

namespace Api.Controllers.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Category, CategoryResource>();

            CreateMap<Usuario, RegistroResource>();

            CreateMap<Product, ProductResource>()
                .ForMember(src => src.UnitOfMeasurement,
                    opt => opt.MapFrom(src => src.UnitOfMeasurement.ToDescriptionString()));
        }
    }
}
