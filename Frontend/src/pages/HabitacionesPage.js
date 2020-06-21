import React from 'react'
import HabitacionesTabla from '../components/HabitacionesTabla'
import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'

const HabitacionesPage = () => {
  return (
    <section>
      <h1>Habitaciones</h1>
      <HabitacionesTabla fetchHabitaciones={fetchHabitaciones} habitacionesSelector={habitacionesSelector}/>
    </section>
  )
}

export default HabitacionesPage