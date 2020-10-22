import React, { useState, useCallback, useEffect } from 'react'
import { fetchReservasMensuales, fetchReservasActuales, reservasSelector } from './slice'
import { fetchHabitaciones, habitacionesSelector } from 'features/habitaciones/slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'
import SelectorDeVista from './SelectorDeVista/Componente'
import Tabla from './Tabla/Tabla'

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(reservasSelector);
  const habitaciones = useSelector(habitacionesSelector);
  const [IsModalVisible, setModalVisibility] = useState(false);

  const fetchData = useCallback(() => {
    // dispatch(fetchReservasMensuales(2020, mes));
    dispatch(fetchReservasActuales())
    dispatch(fetchHabitaciones());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);

  function closeModalAndRefreshTable() {
    hideModal();
    fetchData();
  }

  function hideModal(){
    setModalVisibility(false);
  }

  function showModal(){
    setModalVisibility(true);
  }

  return (
    <div className="container">
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
        
        <h1 className="title is-1">Reservas</h1>        
        <SelectorDeVista 
          onFechaChanged={(anio, mes) => dispatch(fetchReservasMensuales(anio, mes))}
          onDisabled={() => dispatch(fetchReservasActuales())}
        />

        <div className="buttons is-fullwidth is-pulled-right">
          <Button onClick={showModal} text="Cargar nueva"/>
        </div>
        
      {/*Esto no está tan mal, pero igual está mal. */}
      <div>
        {tieneErrores? "Hubo un error." : ((estaCargando || datos.length === 0 || habitaciones.datos === 0) ? "Cargando..." : <Tabla datos={datos} habitaciones={habitaciones.datos} />)}
      </div>
    </div>
  )
}

export default ReservasPage;