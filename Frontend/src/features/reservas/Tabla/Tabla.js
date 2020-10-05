import React from 'react';
import Estilos from './Tabla.module.scss'

const TablaReservas = ({datos, mes}) => {

  
  let filas = [];
  for (let i = 0; i < datos.diasDelMes; i++) {            
    filas.push(<tr key={i}><td>{i+1}/{mes}</td></tr>);
  }    

  return (
      <table className={`table is-hoverable is-bordered is-fullwidth ${Estilos.tabla}`}>
        <thead>
          <tr>
            <th>Día</th>
          </tr>          
        </thead>
        <tbody>
          {filas}
        </tbody>
      </table>
  )
}

export default TablaReservas;