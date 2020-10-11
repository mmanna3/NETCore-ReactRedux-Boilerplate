import React, {useEffect, useState} from 'react';
import Celda from './Celda/Celda'
import Estilos from './Tabla.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { inicializarTabla, tablaDeReservasSelector, actualizarConReserva } from './slice'
import Encabezado from './Encabezado/Encabezado'

const TablaReservas = ({datos, habitaciones, mes}) => {

  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState([]);
  const tablaDeReservas = useSelector(tablaDeReservasSelector);

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
    
    datos.reservas.forEach(reserva => {     
      dispatch(actualizarConReserva(reserva));
    });

    //¿Por quéeee?
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filas = [];
  for (let dia = 1; dia <= datos.diasDelMes; dia++) {            
    filas.push( <tr key={dia}>
                  <td>{dia}/{mes}</td>
                  {tablaDeReservas.camasIdsArray.map((id) =>
                    <Celda key={id} dia={dia} camaId={id}/>
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