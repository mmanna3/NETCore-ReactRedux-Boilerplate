import React from 'react'
import Tabla from '../components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'

const HabitacionesPage = () => {
  return (
    <section>
      <h1>Habitaciones</h1>
      <Tabla getData={fetchHabitaciones} selector={habitacionesSelector}/>
    </section>
  )
}

export default HabitacionesPage