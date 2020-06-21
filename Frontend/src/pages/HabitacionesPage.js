import React, { useState } from 'react';
import Tabla from '../components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'
import CrearModal from './CrearModal'

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
  
  const [show, toggleVisibility] = useState(false);  

  return (
    <section>
      <CrearModal show={show} />
      <h1>Habitaciones</h1>
      <button className="button is-primary" onClick={toggleVisibility}>Crear</button>
      <Tabla getData={fetchHabitaciones} selector={habitacionesSelector} columnas={columnas}/>
    </section>
  )
}

export default HabitacionesPage