import React from 'react'
import Tabla from '../components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'

const HabitacionesPage = () => {
  const columnas = [
    {
      Header: 'Id',
      accessor: 'id',
    },
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
  
  return (
    <section>
      <h1>Habitaciones</h1>
      <Tabla getData={fetchHabitaciones} selector={habitacionesSelector} columnas={columnas}/>
    </section>
  )
}

export default HabitacionesPage