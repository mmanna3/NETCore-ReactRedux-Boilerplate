using AutoMapper;
using Api.Controllers.Resources;
using Api.Controllers.Resources.Usuario;
using Api.Domain.Models;

namespace Api.Controllers.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
            CreateMap<RegistrarUsuarioDTO, Usuario>();
        }
    }
}
