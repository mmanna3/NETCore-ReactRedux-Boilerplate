import React from 'react';
import Styles from './Cell.module.scss'
import { getCamaDiaInfo } from 'features/calendario/reservasDelMes/helper'

const Cell = ({row, column}) => {

  const [style, setStyle] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(false);
  
  const onClick = () => {
    getCamaDiaInfo();
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