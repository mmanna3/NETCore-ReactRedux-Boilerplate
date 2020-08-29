import React from 'react';
import Styles from './Cell.module.scss'
import { selectedOptions } from 'features/calendario/reservasDelMes/consts'
import { getCamaDiaInfo, seleccionarUnSoloDiaEnUnaSolaCama, seleccionarDiaIntermedio, iniciarSeleccion, terminarSeleccion } from 'features/calendario/reservasDelMes/helper'

const Cell = ({row, column}) => {

  const [style, setStyle] = React.useState('');
  
  var selectedCssClassesMap = {};
  selectedCssClassesMap[selectedOptions.NO] = Styles.unselected;
  selectedCssClassesMap[selectedOptions.YES] = Styles.selected;
  selectedCssClassesMap[selectedOptions.UNIQUE] = `${Styles.selected} ${Styles.firstSelected} ${Styles.lastSelected}`;
  selectedCssClassesMap[selectedOptions.FIRST] = `${Styles.selected} ${Styles.firstSelected}`;
  selectedCssClassesMap[selectedOptions.LAST] = `${Styles.selected} ${Styles.lastSelected}`;  
  
  const onClick = () => {
    
    seleccionarUnSoloDiaEnUnaSolaCama(row, column);

    var selected = getCamaDiaInfo(row, column).selected;
    setStyle(selectedCssClassesMap[selected]);
  }

  const onMouseDown = (e) => {    
    e.preventDefault();
    iniciarSeleccion(row, column);
    var selected = getCamaDiaInfo(row, column).selected;  
    setStyle(selectedCssClassesMap[selected]);    
  }

  const onMouseUp = (e) => {
    e.preventDefault();
    terminarSeleccion(row, column);
    var selected = getCamaDiaInfo(row, column).selected;  
    setStyle(selectedCssClassesMap[selected]);    
  }

  const onMouseEnter = (e) => {
    e.preventDefault();    
    
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