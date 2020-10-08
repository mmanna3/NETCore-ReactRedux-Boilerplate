import React, { useState, useCallback, useEffect } from 'react'
import { fetchReservas, reservasSelector } from './slice'
import { fetchHabitaciones, habitacionesSelector } from 'features/habitaciones/slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'
import Tabla from './Tabla/Tabla'

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(reservasSelector);
  const habitaciones = useSelector(habitacionesSelector);

  const fetchData = useCallback(() => {
    dispatch(fetchReservas(2020, 10));
    dispatch(fetchHabitaciones());
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);
  
  const [IsModalVisible, setModalVisibility] = useState(false);

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
        <div className="buttons is-fullwidth is-pulled-right">
          <Button onClick={showModal} text="Cargar nueva" />
        </div>
        
      {/*Esto no está tan mal, pero igual está mal. */}
      {tieneErrores? "Hubo un error." : ((estaCargando || datos.length === 0 || habitaciones.datos === 0) ? "Cargando..." : <Tabla datos={datos} habitaciones={habitaciones.datos} mes="10"/>)}
        
    </div>
  )
}

export default ReservasPage;