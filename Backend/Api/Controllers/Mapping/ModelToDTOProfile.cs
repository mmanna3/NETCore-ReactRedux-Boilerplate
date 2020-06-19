using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
            CreateMap<Habitacion, HabitacionDTO>();

            CreateMap<Usuario, RegistrarDTO>();
        }
    }
}
