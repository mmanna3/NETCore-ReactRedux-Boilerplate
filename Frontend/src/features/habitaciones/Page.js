import React, { useState, useCallback } from 'react';
import Table from 'components/Table'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'

const HabitacionesPage = () => {
  const dispatch = useDispatch();
  const { datos, loading, hasErrors } = useSelector(habitacionesSelector);

  // ✅ Wrap with useCallback to avoid change on every render
  const getData = useCallback(() => {
    dispatch(fetchHabitaciones());
  }, [dispatch]); // ✅ All useCallback dependencies are specified

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Camas matrimoniales',
      accessor: 'camasMatrimoniales',
    },
    {
      Header: 'Camas marineras',
      accessor: 'camasMarineras',
    },
    {
      Header: 'Camas individuales',
      accessor: 'camasIndividuales',
    },
  ]
  
  const [IsModalVisible, setModalVisibility] = useState(false);

  function closeModalAndRefreshTable() {
    hideModal();
    getData();
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
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="buttons is-fullwidth is-pulled-right">
          <button className="button is-primary" onClick={showModal}>Crear</button>
        </div>        
        <Table  getData={getData} 
                selector={habitacionesSelector} 
                columnas={columnas}
                datos={datos}
                loading={loading}
                hasErrors={hasErrors}
        />
    </div>
  )
}

export default HabitacionesPage