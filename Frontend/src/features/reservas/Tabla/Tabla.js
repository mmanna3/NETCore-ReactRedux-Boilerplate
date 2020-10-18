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

    function calcularDias() {
      var mesDesde = obtenerMes(datos.desde);
      var mesHasta = obtenerMes(datos.hasta);

      if (mesDesde === mesHasta) {
        for (let dia = parseInt(obtenerDia(datos.desde)); dia <= obtenerDia(datos.hasta); dia++) {
          _dias.push({'dia': dia, 'mes': mesDesde});
        }
      } else {        
        var diasDelPrimerMes = new Date(obtenerAnio(datos.desde), obtenerMes(datos.desde), 0).getDate(); //dia 0 es el último día del mes anterior        
        for (let dia = parseInt(obtenerDia(datos.desde)); dia <= diasDelPrimerMes; dia++) {
          _dias.push({'dia': dia, 'mes': mesDesde});
        }
        for (let dia = 1; dia <= parseInt(obtenerDia(datos.hasta)); dia++) {
          _dias.push({'dia': dia, 'mes': mesHasta});
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
    tablaDeReservas.diaMesArray.forEach((diaMes) =>
      {
        _filas.push( <tr key={diaMes.dia}>                    
                      <th className={`has-text-weight-medium ${Estilos.fecha}`}>{diaMes.dia}/{diaMes.mes}</th>
                      {tablaDeReservas.camasIdsArray.map((id) =>
                        <Celda key={id} dia={diaMes.dia} camaId={id}/>
                      )}
                    </tr>);
      }
    );
        
    actualizarFilas(_filas);
  }, [tablaDeReservas.camasIdsArray, tablaDeReservas.diaMesArray]);

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