using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Core.Models;
using Api.Core.Repositories;
using Api.Core.Services.Interfaces;

namespace Api.Core.Services
{
    public class ReservaService : IReservaService
    {
        private readonly IReservaRepository _repository;
        private readonly IUnitOfWork _unitOfWork;

        public ReservaService(IReservaRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Reserva>> Listar()
        {
            return await _repository.Listar();
        }

        public async Task<int> Crear(Reserva reserva)
        {
            _repository.Crear(reserva);

            await _unitOfWork.CompleteAsync();
            
            return reserva.Id;
        }
    }
}
