using AutoMapper;
using Api.Controllers.Resources;
using Api.Domain.Models;

namespace Api.Controllers.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
        }
    }
}
