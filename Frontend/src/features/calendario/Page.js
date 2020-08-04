import React from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {  

  const array = new Array(30);
  for(var i = 1; i < 30; i++) {
    array.push(i);
  }

  const [daysSelectionStarted, startOrEndDaySelection] = React.useState([false,false,false,false,false,false,false]);
  const [lastSelectedIndex, setLastSelectedIndex] = React.useState([-1,-1,-1,-1,-1,-1,-1]);

  const startSelection = (columnId, rowId) => {
    modifyStateArrayPosition(daysSelectionStarted, startOrEndDaySelection, columnId, true);    
    modifyStateArrayPosition(lastSelectedIndex, setLastSelectedIndex, columnId, rowId);
  }

  const endSelection = (columnId) => {
    modifyStateArrayPosition(daysSelectionStarted, startOrEndDaySelection, columnId, false);
  }

  const canSelect = (columnId, rowId) => {
    if (lastSelectedIndex[columnId] + 1 == rowId && daysSelectionStarted[columnId]){
      modifyStateArrayPosition(lastSelectedIndex, setLastSelectedIndex, columnId, rowId);
      return true;
    }      
    return false;
  }

  const modifyStateArrayPosition = (array, setFunc, index, value) => {
    var copy = [...array];
    copy[index] = value;
    setFunc(copy);
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
                <Cell startSelection={() => startSelection(0, i)} endSelection={() => endSelection(0)} daysSelectionStarted={daysSelectionStarted[0]} canSelect={() => canSelect(0, i)}></Cell>
                <Cell startSelection={() => startSelection(1, i)} endSelection={() => endSelection(1)} daysSelectionStarted={daysSelectionStarted[1]} canSelect={() => canSelect(1, i)}></Cell>
                <Cell startSelection={() => startSelection(2, i)} endSelection={() => endSelection(2)} daysSelectionStarted={daysSelectionStarted[2]} canSelect={() => canSelect(2, i)}></Cell>
                <Cell startSelection={() => startSelection(3, i)} endSelection={() => endSelection(3)} daysSelectionStarted={daysSelectionStarted[3]} canSelect={() => canSelect(3, i)}></Cell>
                <Cell startSelection={() => startSelection(4, i)} endSelection={() => endSelection(4)} daysSelectionStarted={daysSelectionStarted[4]} canSelect={() => canSelect(4, i)}></Cell>
                <Cell startSelection={() => startSelection(5, i)} endSelection={() => endSelection(5)} daysSelectionStarted={daysSelectionStarted[5]} canSelect={() => canSelect(5, i)}></Cell>
                <Cell startSelection={() => startSelection(6, i)} endSelection={() => endSelection(6)} daysSelectionStarted={daysSelectionStarted[6]} canSelect={() => canSelect(6, i)}></Cell>
              </tr>              
          )}
        </tbody>
    </table>
  </div>
  )
}

export default CalendarioPage;