import React from 'react';

const Encabezado = ({habitaciones}) => {

  var habitacionesConCamasUnificadas = [];
  for (let i = 0; i < habitaciones.length; i++) {
    var habitacion = habitaciones[i];
    var camasDeLaHabitacion = habitacion.camasIndividuales;
    camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasMatrimoniales);    
    camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta) => cucheta.abajo));
    camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta) => cucheta.arriba));    
    habitacionesConCamasUnificadas.push({nombre: habitacion.nombre, camas: camasDeLaHabitacion});
  }

  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2"></th>
            {habitacionesConCamasUnificadas.map((habitacion, i) => 
              <th key={i} colSpan={habitacion.camas.length}>Habitación {habitacion.nombre}</th>
            )}
          </tr>        
          <tr>
            {habitacionesConCamasUnificadas.map((habitacion) => 
              habitacion.camas.map((cama,i) =>
                <th key={i}>{cama.nombre} - {cama.tipo}</th>
              )
            )}
          </tr>
        </thead>
  )
}

export default Encabezado;