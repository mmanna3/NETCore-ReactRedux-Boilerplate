import React from 'react';
import Estilos from './Encabezado.module.scss'

const Encabezado = ({habitaciones}) => {
  
  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2" className={Estilos.interseccion}></th>
            {habitaciones.map((habitacion, i) => 
              <th key={i} className={Estilos.habitacion} colSpan={habitacion.camas.length}>Habitación {habitacion.nombre}</th>
            )}
          </tr>        
          <tr>
            {habitaciones.map((habitacion) => 
              habitacion.camas.map((cama,i) =>
                <th key={i} className={Estilos.cama}>
                  <div>
                    {cama.nombre} - {cama.tipo}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
  )
}

export default Encabezado;