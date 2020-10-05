import React, { useState, useCallback, useEffect } from 'react';
import { fetchReservas, reservasSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(reservasSelector);

  const fetchData = useCallback(() => {
    dispatch(fetchReservas(2020, 9));
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

      {tieneErrores? "Hubo un error." : (estaCargando ? "Cargando..." : datos.diasDelMes)}
      
  
    </div>
  )
}

export default ReservasPage;