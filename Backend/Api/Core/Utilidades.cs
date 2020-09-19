using System;
using System.Globalization;

namespace Api.Core
{
    public static class Utilidades
    {
        public static string FORMATO_FECHA = "yyyy-MM-dd";

        public static DateTime Convertir(string fecha)
        {
            return DateTime.ParseExact(fecha, FORMATO_FECHA, CultureInfo.InvariantCulture);
        }

        public static string Convertir(DateTime fecha)
        {
            return fecha.ToString(FORMATO_FECHA);
        }
    }
}
