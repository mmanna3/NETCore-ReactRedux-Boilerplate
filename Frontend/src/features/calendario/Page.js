import React from 'react';
import Table from './Table/Table.js'

const CalendarioPage = () => {

  var camasPorHabitacion = [
    {
      nombre: 'Azul',
      camas: ['Individual: A', 'Individual: B']
    },
    {
      nombre: 'Roja',
      camas: ['Matrimonial: 1', 'Mar. Arriba: 2', 'Mar. Abajo: 3']
    },
    {
      nombre: 'Verde',
      camas: ['Matrimonial: Matri', 'Individual: Indi']
    }
  ];

  return (  
    <div className="container">
      <h1 className="title is-1">Calendario</h1>
      <Table camasPorHabitacion={camasPorHabitacion} />
  </div>
  )
}

export default CalendarioPage;