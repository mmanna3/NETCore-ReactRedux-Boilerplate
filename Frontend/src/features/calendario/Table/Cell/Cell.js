import React from 'react';
import Styles from './Cell.module.scss'
import { getCamaDiaInfo } from 'features/calendario/reservasDelMes/helper'

const Cell = ({row, column}) => {

  const [style, setStyle] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(false);
  
  const onClick = () => {
    var selectedCssClassesMap = {
      "none": "unselected",
      "yes": "selected"
    };
    
    

    var selected = getCamaDiaInfo(row, column);
    setStyle(selectedCssClassesMap[selected]);
  }

  return (
    <td className={style} 
        row={row}
        column={column}
        onClick={onClick}
        >
    </td>
  )
}

export default Cell;