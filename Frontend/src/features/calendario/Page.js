import React from 'react';
import Cell from './Cell/Cell.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {  

  const array = new Array(30);
  for(var i = 1; i < 30; i++) {
    array.push(i);
  }

  const [isSelecting, setIsSelecting] = React.useState(false);

  const toggleIsSelecting = () => {
    setIsSelecting(!isSelecting);    
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
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
                <Cell toggleIsSelecting={toggleIsSelecting} isSelecting={isSelecting}></Cell>
              </tr>              
          )}
        </tbody>
    </table>
  </div>
  )
}

export default CalendarioPage;