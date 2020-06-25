import React, { useState, useEffect } from 'react';
import Table from 'components/Table'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'

const HabitacionesPage = () => {
  const dispatch = useDispatch();
  const { datos, loading, hasErrors } = useSelector(habitacionesSelector);

  useEffect(() => refreshTable(), []);

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
    refreshTable();
  }

  function hideModal(){
    setModalVisibility(false);
  }

  function showModal(){
    setModalVisibility(true);
  }
  
  function refreshTable(){
    dispatch(fetchHabitaciones());
  }


  return (
    <div className="container">
        <Crear isVisible={IsModalVisible} onHide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="buttons is-fullwidth is-pulled-right">
          <button className="button is-primary" onClick={showModal}>Crear</button>
        </div>        
        <Table  getData={refreshTable} 
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