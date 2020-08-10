import React from 'react';
import Cell from './Table/Cell/Cell_old.js'
import Styles from './Page.module.scss'

const CalendarioPage = () => {
  
  const [dragging, setDragging] = React.useState(false);
  const [yOnMouseDown, setYOnMouseDown] = React.useState(0);

  const onMouseMove = (e) => {
    // debugger;
    if(dragging) {
      // e.preventDefault();
      // $('.hour').each( function() {
      //     var top = $(this).offset().top;
      //     var bottom = top + $(this).height();
      //     if( bottom > yOnMousedown && e.pageY > top )
      //         $(this).addClass( 'hour-highlighted' );
      //     else
      //         $(this).removeClass( 'hour-highlighted' );
      // } );
    }
  }

  return (  
    <div className="container">
      <h1 className="title is-1">Calendario</h1>
      <table onMouseMove={(e) => onMouseMove(e)} className={`table is-hoverable is-bordered is-fullwidth ${Styles.table}`}>
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
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((e, i) => 
              <tr key={i}>
                <td>{e}/07</td>
                {[0,1,2,3,4,5,6].map((e, column) =>
                    <Cell
                      setDragging={setDragging}
                      setYOnMouseDown={setYOnMouseDown}
                      onMouseMove={onMouseMove}
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