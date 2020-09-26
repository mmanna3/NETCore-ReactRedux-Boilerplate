using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Core.Models;
using Microsoft.EntityFrameworkCore.Internal;

namespace Api.Controllers.Mapping
{
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
            CreateMap<Huesped, HuespedDTO>();
            CreateMap<Habitacion, HabitacionDTO>();

            CreateMap<CamaIndividual, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Individual")
                );

            CreateMap<CamaMatrimonial, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Matrimimonial")
                );

            CreateMap<CamaCuchetaDeAbajo, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Cucheta Abajo")
                );

            CreateMap<CamaCuchetaDeArriba, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => "Cucheta Arriba")
                );

            CreateMap<Habitacion, HabitacionDTO>()
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

            CreateMap<CamaCucheta, CamaCuchetaDTO>()
                .ForMember(
                    dest => dest.Abajo,
                    opt => opt.MapFrom(src => src.Abajo)
                )
                .ForMember(
                    dest => dest.Arriba,
                    opt => opt.MapFrom(src => src.Arriba)
                );

            CreateMap<Usuario, RegistrarDTO>();

            CreateMap<Habitacion, HabitacionParaReservaDTO>()
                .ForMember(
                    dest => dest.Camas,
                    opt => opt.Ignore()
                )
                .ForMember(
                    dest => dest.CantidadDeLugaresLibres,
                    opt => opt.Ignore()
                );
        }
    }
}
