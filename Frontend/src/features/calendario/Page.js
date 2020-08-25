import React from 'react';
import Table from './Table/Table.js'

const CalendarioPage = () => {

  var camasPorHabitacion = [
    {
      id: 1,
      nombre: 'Azul',
      camas: [
        {
          id: 1,
          nombre:'Individual: A'
        },
        {
          id: 2,
          nombre:'Individual: B'
        },
      ]
    },
    {
      id: 2,
      nombre: 'Roja',
      camas: [
        {
          id: 3,
          nombre:'Matrimonial'
        },
        {
          id: 4,
          nombre:'Mar: Arr.'
        },
        {
          id: 5,
          nombre:'Mar: Ab.'
        },
      ]
    },
    {
      id: 3,
      nombre: 'Verde',
      camas: [
        {
          id: 6,
          nombre:'Matrimonial'
        },
        {
          id: 7,
          nombre:'Individual única'
        }
      ]
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