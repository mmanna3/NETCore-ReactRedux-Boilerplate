using AutoMapper;
using Hostelapp.Domain.Models;
using Hostelapp.Resources;

namespace Hostelapp.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveCategoryResource, Category>();
        }
    }
}
