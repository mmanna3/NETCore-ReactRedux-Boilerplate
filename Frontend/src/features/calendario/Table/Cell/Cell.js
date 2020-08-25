import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({row, column, onClick}) => {

  const [style, setStyle] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(false);
  
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