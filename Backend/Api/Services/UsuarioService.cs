using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Domain;
using Api.Domain.Models;
using Api.Domain.Repositories;
using Api.Domain.Services;
using Api.Services.Communication;

namespace Api.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UsuarioService(IUsuarioRepository usuarioRepository, IUnitOfWork unitOfWork)
        {
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
        }

        //public Usuario Autenticar(string username, string password)
        //{
        //    if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
        //        return null;

        //    var user = _context.Users.SingleOrDefault(x => x.Username == username);

        //    // check if username exists
        //    if (user == null)
        //        return null;

        //    // check if password is correct
        //    if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
        //        return null;

        //    // authentication successful
        //    return user;
        //}

        public async Task<UsuarioResponse> AddAsync(Usuario usuario, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            var usuarioConElMismoUsername = await _usuarioRepository.FindByUsernameAsync(usuario.Username);

            if (usuarioConElMismoUsername != null)
                throw new AppException($@"Username '{usuario.Username}' is already taken");

            CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            usuario.PasswordHash = passwordHash;
            usuario.PasswordSalt = passwordSalt;

            try
            {
                await _usuarioRepository.AddAsync(usuario);
                await _unitOfWork.CompleteAsync();

                return new UsuarioResponse(usuario);
            }
            catch (Exception ex)
            {
                // Do some logging stuff
                return new UsuarioResponse($"An error occurred when saving the category: {ex.Message}");
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", nameof(password));
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", nameof(storedHash));
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", nameof(storedSalt));

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) 
                        return false;
                }
            }

            return true;
        }
    }
}
