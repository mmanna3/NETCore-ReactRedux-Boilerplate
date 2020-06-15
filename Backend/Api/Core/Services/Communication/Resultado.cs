using Microsoft.AspNetCore.Mvc;

namespace Api.Core.Services.Communication
{
    public class Resultado<T>
    {
        public T Objeto { get; private set; }
        public bool HuboError { get; protected set; }
        public string MensajeDeError { get; protected set; }

        private Resultado(T objeto)
        {
            Objeto = objeto;
        }
        private Resultado() {}

        public static implicit operator Resultado<T>(T objeto) => new Resultado<T>(objeto);

        public static Resultado<T> ConError(string mensaje)
        {
            return new Resultado<T>
            {
                HuboError = true,
                MensajeDeError = mensaje
            };
        }
    }
}
