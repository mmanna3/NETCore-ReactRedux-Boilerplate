import React, {useEffect} from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Table.module.scss'
import Thead from './Thead/Thead.js'
import {init} from 'features/calendario/reservasDelMesHelper'

const Table = ({camasPorHabitacion, diasDelMes}) => {    
  useEffect(() => setCalendarioInitialState(), [camasPorHabitacion, diasDelMes]);

  var camas = camasPorHabitacion.map((habitacion) => 
  habitacion.camas.map((cama) => {
      return {
        habitacion: habitacion.nombre,
        cama
      }
  })).flat();

  const setCalendarioInitialState = () => {
    init(diasDelMes, camas);
  }
  


  // const [reservasVirtualTable, setReservasVirtualTable] = React.useState(initialReservasVirtualTable);
  
  const onClick = (row, column) => {
    // debugger;
    // var copyReservasVirtualTable = reservasVirtualTable;
    // copyReservasVirtualTable[row][column] = {selected: 'yes'}
    // setReservasVirtualTable(copyReservasVirtualTable);
    // console.log(reservasVirtualTable);
  }

  return (
      <table className={`table is-hoverable is-bordered is-fullwidth ${Styles.table}`}>
        <Thead camasPorHabitacion={camasPorHabitacion} />
        <tbody>
          {diasDelMes.map((dia, row) => 
              <tr key={row}>
                <td>{dia}/07</td>
                {camas.map((cama, column) =>
                      <Cell
                        key={column}
                        row={row}
                        column={column}
                        onClick={() => onClick(row, column)}
                      />
                )}
              </tr>              
          )}
        </tbody>
    </table>
  )
}

export default Table;