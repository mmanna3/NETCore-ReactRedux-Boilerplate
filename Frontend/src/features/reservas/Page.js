import React, { useState, useCallback } from 'react';
import Table from 'components/Table'
import { fetchReservas, reservasSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import {Button} from 'components/Buttons'

const ReservasPage = () => {
  const dispatch = useDispatch();
  const { datos, loading, hasErrors } = useSelector(reservasSelector);

  const fetchData = useCallback(() => {
    // dispatch(fetchReservas());
  }, [dispatch]);

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    }
  ]
  
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
        {/* <Table  fetchData={fetchData}
                selector={reservasSelector}
                columnas={columnas}
                datos={datos}
                loading={loading}
                hasErrors={hasErrors}
        /> */}
    </div>
  )
}

export default ReservasPage;