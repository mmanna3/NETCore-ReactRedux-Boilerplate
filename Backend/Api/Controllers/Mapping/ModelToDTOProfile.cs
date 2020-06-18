using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Usuario;
using Api.Controllers.Otros;
using AutoMapper;
using Api.Controllers.Resources;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
            CreateMap<Habitacion, HabitacionDTO>();

            CreateMap<Usuario, RegistrarDTO>();

            CreateMap<Product, ProductResource>()
                .ForMember(src => src.UnitOfMeasurement,
                    opt => opt.MapFrom(src => src.UnitOfMeasurement.ToDescriptionString()));
        }
    }
}
