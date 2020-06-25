import React, { useState } from 'react';
import Tabla from 'components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch } from 'react-redux'
import Crear from './crear/Modal'

const HabitacionesPage = () => {
  const dispatch = useDispatch();

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
    dispatch(fetchHabitaciones());  //Probablemente esto corresponda hacerlo de alguna forma adentro de la tabla
  }

  function hideModal(){
    setModalVisibility(false);
  }

  function showModal(){
    setModalVisibility(true);
  }
  
  function getData(){
    dispatch(fetchHabitaciones());
  }


  return (
    <div className="container">
        <Crear isVisible={IsModalVisible} hide={hideModal} onSuccessfulSubmit={closeModalAndRefreshTable}></Crear>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="buttons is-fullwidth is-pulled-right">
          <button className="button is-primary" onClick={showModal}>Crear</button>
        </div>        
        <Tabla getData={getData} selector={habitacionesSelector} columnas={columnas}/>
    </div>
  )
}

export default HabitacionesPage