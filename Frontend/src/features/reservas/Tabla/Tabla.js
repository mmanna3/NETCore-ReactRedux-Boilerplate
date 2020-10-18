import React, {useEffect, useState} from 'react';
import Celda from './Celda/Celda'
import Estilos from './Tabla.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { inicializarTabla, tablaDeReservasSelector, actualizarConReserva } from './slice'
import Encabezado from './Encabezado/Encabezado'
import {obtenerAnio,obtenerMes,obtenerDia} from 'utils/Fecha'

const TablaReservas = ({datos, habitaciones}) => {

  const dispatch = useDispatch();
  const [habitacionesConCamasUnificadas, setHabitacionesConCamasUnificadas] = useState([]);
  const [filas, actualizarFilas] = useState([]);
  const tablaDeReservas = useSelector(tablaDeReservasSelector);

  useEffect(() => {

    var _dias = [];

    function calcularDias(){      
      
      if (obtenerMes(datos.hasta) === obtenerMes(datos.desde)) {
        for (let i = parseInt(obtenerDia(datos.desde)); i <= obtenerDia(datos.hasta); i++) {
          _dias.push(i);
        }    
      } else {
        var diasDelPrimerMes = new Date(obtenerAnio(datos.desde), obtenerMes(datos.desde), 0).getDate(); //dia 0 es el último día del mes anterior
        for (let i = obtenerDia(datos.desde) + 0; i <= diasDelPrimerMes; i++) {
          _dias.push(i);
        }
        for (let i = 1; i <= obtenerDia(datos.hasta); i++) {
          _dias.push(i);
        }
      }
    }

    calcularDias();


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
    
    
    dispatch(inicializarTabla(_dias, camasIdsArray));
    
    datos.reservas.forEach(reserva => {     
      dispatch(actualizarConReserva(reserva));
    });

  }, [datos.desde, datos.hasta, datos.reservas, dispatch, habitaciones]);

  useEffect(() => {    

    let _filas = [];
    tablaDeReservas.diasArray.forEach((dia) =>
      {
        _filas.push( <tr key={dia}>                    
                      <th className={Estilos.fecha}>{dia}</th>
                      {tablaDeReservas.camasIdsArray.map((id) =>
                        <Celda key={id} dia={dia} camaId={id}/>
                      )}
                    </tr>);
      }
    );
        
    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.diasArray]);

  return (
    <div className={Estilos.contenedor}>
      <table className={`table is-hoverable is-bordered is-fullwidth ${Estilos.tabla}`}>
        <Encabezado habitaciones={habitacionesConCamasUnificadas} />
        <tbody>
          {filas}
        </tbody>
      </table>
    </div>
  )
}

export default TablaReservas;