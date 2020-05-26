using AutoMapper;
using Hostelapp.Controllers.Resources;
using Hostelapp.Domain.Models;

namespace Hostelapp.Controllers.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
        }
    }
}
