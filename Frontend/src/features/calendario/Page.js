import React from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {  

  const array = new Array(30);
  for(var i = 1; i < 30; i++) {
    array.push(i);
  }

  const [selectionData, setSelected] = React.useState({daysSelectionStarted: false, lastSelectedIndex: -1, selectedColumn: -1});
  
  const startSelection = (columnId, rowId) => {
    var copy = selectionData;
    selectionData.daysSelectionStarted = true;
    selectionData.lastSelectedIndex = rowId;
    selectionData.selectedColumn = columnId;
    setSelected(copy);

  }

  const endSelection = () => {
    var copy = selectionData;
    selectionData.daysSelectionStarted = false;
    selectionData.lastSelectedIndex = -1;
    selectionData.selectedColumn = -1;
    setSelected(copy);
  }

  const canBeSelected = (columnId, rowId) => {
    
    if (selectionData.selectedColumn === columnId && selectionData.lastSelectedIndex + 1 === rowId && selectionData.daysSelectionStarted) {

      var copy = selectionData;
      selectionData.daysSelectionStarted = true;
      selectionData.lastSelectedIndex = rowId;
      selectionData.selectedColumn = columnId;
      setSelected(copy);

      return true;
    }      
    return false;
  }

  // const isInmediatlyUnderLastSelectedCell = (columnId, rowId) => lastSelectedIndex[columnId] + 1 === rowId;

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
                <Cell startSelection={() => startSelection(0, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(0, i)}></Cell>
                <Cell startSelection={() => startSelection(1, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(1, i)}></Cell>
                <Cell startSelection={() => startSelection(2, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(2, i)}></Cell>
                <Cell startSelection={() => startSelection(3, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(3, i)}></Cell>
                <Cell startSelection={() => startSelection(4, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(4, i)}></Cell>
                <Cell startSelection={() => startSelection(5, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(5, i)}></Cell>
                <Cell startSelection={() => startSelection(6, i)} endSelection={() => endSelection()} selectionData={selectionData} canBeSelected={() => canBeSelected(6, i)}></Cell>
              </tr>              
          )}
        </tbody>
    </table>
  </div>
  )
}

export default CalendarioPage;