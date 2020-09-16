using Api.Controllers.DTOs;
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

            CreateMap<HuespedDTO, Huesped>();

            CreateMap<HabitacionDTO, Habitacion>()
                .ForMember(
                    dest => dest.CamasIndividuales,
                    opt => opt.MapFrom(src => src.CamasIndividuales)
                )
                .ForMember(
                    dest => dest.CamasMatrimoniales,
                    opt => opt.MapFrom(src => src.CamasMatrimoniales)
                )
                .ForMember(
                    dest => dest.CamasCuchetas,
                    opt => opt.MapFrom(src => src.CamasCuchetas)
                );

            CreateMap<CamaDTO, CamaIndividual>();
            CreateMap<CamaDTO, CamaMatrimonial>();
            CreateMap<CamaDTO, CamaCuchetaDeAbajo>();
            CreateMap<CamaDTO, CamaCuchetaDeArriba>();

            CreateMap<CamaCuchetaDTO, CamaCucheta>()
                .ForMember(
                    dest => dest.Abajo,
                    opt => opt.MapFrom(src => src.Abajo)
                )
                .ForMember(
                    dest => dest.Arriba,
                    opt => opt.MapFrom(src => src.Arriba)
                );
        }
    }
}
