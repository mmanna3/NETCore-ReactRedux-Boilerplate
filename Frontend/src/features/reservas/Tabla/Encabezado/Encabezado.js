import React from 'react';

const Encabezado = ({habitaciones}) => {
  
  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2"></th>
            {habitaciones.map((habitacion, i) => 
              <th key={i} colSpan={habitacion.camas.length}>Habitación {habitacion.nombre}</th>
            )}
          </tr>        
          <tr>
            {habitaciones.map((habitacion) => 
              habitacion.camas.map((cama,i) =>
                <th key={i}>{cama.nombre} - {cama.tipo} ({cama.id})</th>
              )
            )}
          </tr>
        </thead>
  )
}

export default Encabezado;