import React from 'react';
import Styles from './Cell.module.scss'
import { getCamaDiaInfo, seleccionarUnSoloDiaEnUnaSolaCama, seleccionarDiaIntermedio, iniciarSeleccion } from 'features/calendario/reservasDelMes/helper'

const Cell = ({row, column}) => {

  const [style, setStyle] = React.useState('');
  const selectedCssClassesMap = {
    "none": Styles.unselected,
    "yes": Styles.selected,
    "unique": `${Styles.selected} ${Styles.firstSelected} ${Styles.lastSelected}`,
    "first": `${Styles.selected} ${Styles.firstSelected}`
  };
  
  
  const onClick = () => {
    
    seleccionarUnSoloDiaEnUnaSolaCama(row, column);

    var selected = getCamaDiaInfo(row, column).selected;
    setStyle(selectedCssClassesMap[selected]);
  }

  const onMouseDown = (e) => {    
    e.preventDefault();

    // if (!selectionData.hasStarted) {      

      iniciarSeleccion(row, column);
      var selected = getCamaDiaInfo(row, column).selected;  
      setStyle(selectedCssClassesMap[selected]);
      // startSelection();     
    // }     
  }

  const onMouseUp = () => {

  }

  const onMouseEnter = (e) => {
    e.preventDefault();    
    debugger;
    var celdaInfo = getCamaDiaInfo(row, column);
    if (celdaInfo.canBeSelected)
      seleccionarDiaIntermedio(row, column);
    
    celdaInfo = getCamaDiaInfo(row, column);
    setStyle(selectedCssClassesMap[celdaInfo.selected]);
  }

  return (
    <td className={style} 
        row={row}
        column={column}
        onClick={onClick}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown} 
        onMouseEnter={onMouseEnter}>
    </td>
  )
}

export default Cell;