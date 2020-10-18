using System;
using System.Collections.Generic;
using System.Linq;
using Api.Controllers.DTOs;
using Api.Controllers.DTOs.Habitacion;
using Api.Controllers.DTOs.Usuario;
using Api.Core;
using AutoMapper;
using Api.Core.Models;

namespace Api.Controllers.Mapping
{
    public class ModelToDTOProfile : Profile
    {
        public ModelToDTOProfile()
        {
            CreateMap<Huesped, HuespedDTO>();
            CreateMap<Habitacion, HabitacionDTO>();

            CreateMap<Cama, CamaDTO>()
                .ForMember(
                    dest => dest.Tipo,
                    opt => opt.MapFrom(src => src.Tipo())
                );

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

            CreateMap<Reserva, ReservaDTO>()
                .ForMember(
                    dest => dest.CamasIds,
                    opt => opt.MapFrom(src => src.ReservaCamas.Select(x => x.CamaId))
                );

            CreateMap<Reserva, ReservasDelMesDTO.ReservaParaConsultaMensualDTO>()
                .ForMember(
                    dest => dest.DiaInicio,
                    opt => opt.MapFrom((src, dest, _, context) => src.Desde.Month < (int)context.Options.Items["mesInicial"] ? (int)context.Options.Items["diaInicial"] : src.Desde.Day)
                )
                .ForMember(
                    dest => dest.DiaFin,
                    //opt => opt.MapFrom((src, dest, _, context) => src.Hasta.Month > (int)context.Options.Items["mesFinal"] ? DateTime.DaysInMonth((int)context.Options.Items["anio"], (int)context.Options.Items["mes"]) : src.Hasta.Day)
                    opt => opt.MapFrom((src, dest, _, context) => src.Hasta.Month > (int)context.Options.Items["mesFinal"] ? (int)context.Options.Items["diaFinal"] : src.Hasta.Day)
                )
                .ForMember(
                    dest => dest.CamasIds,
                    opt => opt.MapFrom(src => src.ReservaCamas.Select(x => x.CamaId))
                );

            CreateMap<IEnumerable<Reserva>, ReservasDelMesDTO>()
                .ForMember(
                    dest => dest.Reservas,
                    opt => opt.MapFrom(src => src)
                )
                .ForMember(
                    dest => dest.DiasDelMes,
                    opt => opt.MapFrom((src, dest, _, context) => (int)context.Options.Items["diaFinal"])
                    //opt => opt.MapFrom((src, dest, _, context) => DateTime.DaysInMonth((int)context.Options.Items["anio"], (int)context.Options.Items["mes"]))
                );

            CreateMap<DateTime, string>().ConvertUsing(new DateTimeAStringConverter());
        }

        public class DateTimeAStringConverter : ITypeConverter<DateTime, string>
        {
            public string Convert(DateTime source, string destination, ResolutionContext context)
            {
                return Utilidades.ConvertirFecha(source);
            }
        }
    }
}
