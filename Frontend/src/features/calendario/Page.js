import React from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {  

  const array = new Array(30);
  for(var i = 1; i < 30; i++) {
    array.push(i);
  }

  const [daysSelectionStarted, startOrEndDaySelection] = React.useState([false,false,false,false,false,false,false]);

  const startSelection = (columnId) => {
    var newArray = [...daysSelectionStarted];    
    newArray[columnId] = true;
    startOrEndDaySelection(newArray);
  }

  const endSelection = (columnId) => {
    var newArray = [...daysSelectionStarted];    
    newArray[columnId] = false;
    startOrEndDaySelection(newArray);
  }

  return (  
    <div className="container">
      <h1 className="title is-1">Calendario</h1>
      <table className={`table is-hoverable is-bordered is-fullwidth ${Styles.table}`}>
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2"></th>
            <th colSpan="2">Habitación Azul</th>
            <th colSpan="3">Habitación Roja</th>
            <th colSpan="2">Habitación Verde</th>
          </tr>        
          <tr>
            <th>Individual: A</th>
            <th>Individual: B</th>
            <th>Matrimonial: 1</th>
            <th>Mar. arriba: 2</th>
            <th>Mar. abajo: 3</th>
            <th>Matrimonial: Matri</th>
            <th>Individual: Indi</th>
          </tr>
        </thead>
        <tbody>
          {array.map((e, i) => 
              <tr key={i}>
                <td>{e}/07</td>
                <Cell columnId={0} startSelection={() => startSelection(0)} endSelection={() => endSelection(0)} daysSelectionStarted={daysSelectionStarted[0]}></Cell>
                <Cell columnId={1} startSelection={() => startSelection(1)} endSelection={() => endSelection(1)} daysSelectionStarted={daysSelectionStarted[1]}></Cell>
                <Cell columnId={2} startSelection={() => startSelection(2)} endSelection={() => endSelection(2)}daysSelectionStarted={daysSelectionStarted[2]}></Cell>
                <Cell columnId={3} startSelection={() => startSelection(3)} endSelection={() => endSelection(3)}daysSelectionStarted={daysSelectionStarted[3]}></Cell>
                <Cell columnId={4} startSelection={() => startSelection(4)} endSelection={() => endSelection(4)}daysSelectionStarted={daysSelectionStarted[4]}></Cell>
                <Cell columnId={5} startSelection={() => startSelection(5)} endSelection={() => endSelection(5)}daysSelectionStarted={daysSelectionStarted[5]}></Cell>
                <Cell columnId={6} startSelection={() => startSelection(6)} endSelection={() => endSelection(6)}daysSelectionStarted={daysSelectionStarted[6]}></Cell>                
              </tr>              
          )}
        </tbody>
    </table>
  </div>
  )
}

export default CalendarioPage;