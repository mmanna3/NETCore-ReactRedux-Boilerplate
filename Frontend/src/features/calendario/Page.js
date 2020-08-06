import React from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {  

  const array = new Array(30);
  for(var i = 1; i < 30; i++) {
    array.push(i);
  }

  const [selectionData, setSelected] = React.useState({hasStarted: false, currentColumn: -1, currentSelection: []});
  
  const selectFirstRow = (columnId, rowId) => {
    updateSelectionData(true, columnId, rowId);
  }

  const endSelection = () => {
    updateSelectionData(false, -1, -1);
  }

  const canBeSelected = (columnId, rowId) => {
    
    if (selectionData.currentColumn === columnId && isContiguous(rowId) && selectionData.hasStarted) {
      updateSelectionData(true, columnId, rowId);
      return true;
    }

    return false;
  }

  const canBeClickedForEndingSelection = (columnId, rowId) => {
    return selectionData.currentColumn === columnId && isLastRow(rowId) && selectionData.hasStarted;
  }

  const isContiguous = (rowId) => selectionData.currentSelection[selectionData.currentSelection.length - 1] + 1 === rowId;

  const isLastRow = (rowId) => selectionData.currentSelection[selectionData.currentSelection.length - 1] === rowId;

  const updateSelectionData = (hasStarted, currentColumn, lastRow) => {
    var copy = selectionData;
    selectionData.hasStarted = hasStarted;
    selectionData.currentColumn = currentColumn;
    
    if (lastRow != -1)
      selectionData.currentSelection.push(lastRow);    
  
    setSelected(copy);
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
                {[0,1,2,3,4,5,6].map((e, column) =>
                    <Cell
                      startSelection={() => selectFirstRow(column, i)}
                      endSelection={() => endSelection()} 
                      selectionData={selectionData} 
                      canBeSelected={() => canBeSelected(column, i)}
                      canBeClickedForEndingSelection={() => canBeClickedForEndingSelection(column, i)}
                    />                    
                )}
              </tr>              
          )}
        </tbody>
    </table>
  </div>
  )
}

export default CalendarioPage;