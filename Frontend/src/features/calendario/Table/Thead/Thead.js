import React from 'react';

const Thead = ({camasPorHabitacion}) => {

  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2"></th>
            {camasPorHabitacion.map((habitacion) => 
              <th colSpan={habitacion.camas.length}>Habitación {habitacion.nombre}</th>
            )}
          </tr>        
          <tr>
            {camasPorHabitacion.map((habitacion) => 
              habitacion.camas.map((cama) =>
                <th>{cama}</th>
              )
            )}
          </tr>
        </thead>
  )
}

export default Thead;