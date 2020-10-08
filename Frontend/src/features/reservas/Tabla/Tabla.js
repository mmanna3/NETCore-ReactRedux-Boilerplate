import React, {useEffect} from 'react';
import Celda from './Celda/Celda'
import Estilos from './Tabla.module.scss'
import { useDispatch } from 'react-redux'
import { inicializarTabla } from './slice'

const TablaReservas = ({datos, habitaciones, mes}) => {

  const dispatch = useDispatch();
  useEffect(() => {dispatch(inicializarTabla(datos.diasDelMes));console.log(habitaciones)}, [dispatch, datos.diasDelMes, habitaciones]);

  let filas = [];
  for (let i = 0; i < datos.diasDelMes; i++) {            
    filas.push( <tr key={i}>
                  <td>{i+1}/{mes}</td>
                  {datos.camas.map((cama) =>                     
                    <Celda key={cama.id} />
                  )}
                </tr>);
  }
    
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
}

export default TablaReservas;