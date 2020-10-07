import React from 'react';
import Estilos from './Tabla.module.scss'

const TablaReservas = ({datos, mes}) => {

  let filas = [];
  for (let i = 0; i < datos.diasDelMes; i++) {            
    filas.push(<tr key={i}><td>{i+1}/{mes}</td></tr>);
  }

  //Esto está feo, arreglalo.
  if (datos.camas)
    
    return (
        <table className={`table is-hoverable is-bordered is-fullwidth ${Estilos.tabla}`}>
          <thead>
            <tr>
              <th>Día</th>
              {datos.camas.map((cama) => 
                <th key={cama.id}>{cama.nombre} - {cama.tipo}</th>
              )}
            </tr>          
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
    )
  else
      return null;
}

export default TablaReservas;