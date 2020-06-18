using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Controllers.Resources;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class DTOToModelProfile : Profile
    {
        public DTOToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
            CreateMap<RegistrarDTO, Usuario>();
            CreateMap<HabitacionDTO, Habitacion>();
        }
    }
}
