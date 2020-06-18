using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class HabitacionService : IHabitacionService
    {
        private readonly IHabitacionRepository _habitacionRepository;
        private readonly IUnitOfWork _unitOfWork;

        public HabitacionService(IHabitacionRepository habitacionRepository, IUnitOfWork unitOfWork)
        {
            _habitacionRepository = habitacionRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Habitacion>> ListarAsync()
        {
            return await _habitacionRepository.ListarAsync();
        }

        public async Task<int> CrearAsync(Habitacion habitacion)
        {
            _habitacionRepository.Crear(habitacion);
            await _unitOfWork.CompleteAsync();
            return habitacion.Id;
        }

        //public async Task ModificarAsync(int id, Habitacion habitacion) //Y si recibe DTO y mapea?
        //{
        //    var habitacionAModificar = await _habitacionRepository.BuscarPorIdAsync(id);

        //    if (habitacionAModificar == null)
        //        throw new AppException($"No se encontró la habitación de id:{id}");

        //    //Debería haber un mapeo acá

        //    _habitacionRepository.Actualizar(habitacion);
        //}
    }
}
