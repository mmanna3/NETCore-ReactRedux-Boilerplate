using Api.Core.Models;

namespace Api.Services.Communication
{
    public class UsuarioResponse : BaseResponse
    {
        public Usuario Usuario { get; private set; }

        private UsuarioResponse(bool success, string message, Usuario usuario) : base(success, message)
        {
            Usuario = usuario;
        }

        //Si el usuario es nulo debería poner success en false
        public UsuarioResponse(Usuario usuario) : this(true, string.Empty, usuario)
        { }

        public UsuarioResponse(string message) : this(false, message, null)
        { }
    }
}
