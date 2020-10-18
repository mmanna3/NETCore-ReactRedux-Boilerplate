import React, { useState, useCallback, useEffect } from 'react'
import { fetchReservasMensuales, fetchReservasActuales, reservasSelector } from './slice'
import { fetchHabitaciones, habitacionesSelector } from 'features/habitaciones/slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'
import { SelectConLabelInline } from 'components/Select'
import Tabla from './Tabla/Tabla'

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(reservasSelector);
  const habitaciones = useSelector(habitacionesSelector);
  const [IsModalVisible, setModalVisibility] = useState(false);
  const [mes, actualizarMes] = useState(new Date().getMonth()+1);

  const fetchData = useCallback(() => {
    dispatch(fetchReservasMensuales(2020, mes));
    dispatch(fetchHabitaciones());
  }, [dispatch, mes]);

  useEffect(() => fetchData(), [fetchData, mes]);  

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
        <SelectConLabelInline label="Mes" defaultValue={mes} onChange={(e) => actualizarMes(e.target.value)}>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </SelectConLabelInline>
        <Button onClick={()=> dispatch(fetchReservasActuales())} text="Vista actual"/>
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