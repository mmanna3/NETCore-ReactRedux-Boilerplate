using Api.Controllers.DTOs.Usuario;
using AutoMapper;
using Api.Controllers.Resources;
using Api.Domain.Models;

namespace Api.Controllers.Mapping
{
    public class DTOToModelProfile : Profile
    {
        public DTOToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
            CreateMap<RegistrarDTO, Usuario>();
        }
    }
}
