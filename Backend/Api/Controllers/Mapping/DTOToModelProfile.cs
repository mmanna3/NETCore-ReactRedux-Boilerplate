using System;
using System.Linq;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Usuario;
using Api.Core;
using AutoMapper;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class DTOToModelProfile : Profile
    {
        public DTOToModelProfile()
        {
            CreateMap<string, DateTime>().ConvertUsing(new DateTimeTypeConverter());

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
                )
                .AfterMap((dto, entity) =>
                {
                    entity.Arriba = new CamaCuchetaDeArriba {Nombre = dto.Nombre};
                    entity.Abajo = new CamaCuchetaDeAbajo {Nombre = dto.Nombre};
                });

            CreateMap<ReservaDTO, Reserva>()
                .ForMember(
                    m => m.ReservaCamas,
                    dto => dto.MapFrom(x => x.CamasIds.Where(c => c != null))
                )
                .AfterMap((model, entity) =>
                {
                    foreach (var reservaCama in entity.ReservaCamas)
                    {
                        reservaCama.Reserva = entity;
                    }
                });


            CreateMap<int, ReservaCama>()
                .ForMember(
                    m => m.CamaId,
                    dto => dto.MapFrom(x => x)
                );
        }

        public class DateTimeTypeConverter : ITypeConverter<string, DateTime>
        {
            public DateTime Convert(string source, DateTime destination, ResolutionContext context)
            {
                return Utilidades.Convertir(source);
            }
        }
    }
}
