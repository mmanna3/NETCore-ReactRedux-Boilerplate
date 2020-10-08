import React, {useEffect, useState} from 'react';
import Celda from './Celda/Celda'
import Estilos from './Tabla.module.scss'
import { useDispatch } from 'react-redux'
import { inicializarTabla } from './slice'
import Encabezado from './Encabezado/Encabezado'

const TablaReservas = ({datos, habitaciones, mes}) => {

  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState([]);

  useEffect(() => {
    var camasIdsArray = [];
    var habs = [];
    for (let i = 0; i < habitaciones.length; i++) {
      var habitacion = habitaciones[i];
      var camasDeLaHabitacion = habitacion.camasIndividuales;
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasMatrimoniales);    
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta) => cucheta.abajo));
      camasDeLaHabitacion = camasDeLaHabitacion.concat(habitacion.camasCuchetas.map((cucheta) => cucheta.arriba));    
      habs.push({nombre: habitacion.nombre, camas: camasDeLaHabitacion});
      camasIdsArray = camasIdsArray.concat(camasDeLaHabitacion.map((cama) => cama.id));
    }
    setHabitacionesConCamasUnificadas(habs);
    
    dispatch(inicializarTabla(datos.diasDelMes, camasIdsArray));

    //¿Por quéeee?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Encabezado habitaciones={habitacionesConCamasUnificadas} />
          <tbody>
            {filas}
          </tbody>
        </table>
    )
}

export default TablaReservas;