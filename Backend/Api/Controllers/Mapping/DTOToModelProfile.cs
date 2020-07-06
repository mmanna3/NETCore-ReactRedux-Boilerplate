using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class DTOToModelProfile : Profile
    {
        public DTOToModelProfile()
        {
            CreateMap<RegistrarDTO, Usuario>();

            CreateMap<HabitacionDTO, Habitacion>();
            CreateMap<CamaIndividualDTO, CamaIndividual>();
            CreateMap<CamaMatrimonialDTO, CamaMatrimonial>();
            CreateMap<CamaMarineraDTO, CamaMarinera>();
        }
    }
}
