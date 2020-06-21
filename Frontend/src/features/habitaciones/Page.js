import React, { useState } from 'react';
import Tabla from '../../components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import Crear from './crear/modal'

const HabitacionesPage = () => {
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
  
  const [modalEsVisible, togglearVisibilidadModal] = useState(false);  

  return (
    <div className="container">
        <Crear esVisible={modalEsVisible} cerrar={togglearVisibilidadModal}></Crear>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="buttons is-fullwidth is-pulled-right">
          <button className="button is-primary" onClick={togglearVisibilidadModal}>Crear</button>
        </div>        
        <Tabla getData={fetchHabitaciones} selector={habitacionesSelector} columnas={columnas}/>
    </div>
  )
}

export default HabitacionesPage