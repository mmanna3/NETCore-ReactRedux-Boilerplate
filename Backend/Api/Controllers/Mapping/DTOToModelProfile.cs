using AutoMapper;
using Api.Controllers.Resources;
using Api.Controllers.Resources.Usuario;
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
