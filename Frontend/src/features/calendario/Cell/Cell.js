import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({setDragging, setYOnMouseDown}) => {

  const [style, setStyle] = React.useState('');

  const onMouseDown = (e) => {
    debugger;
    setStyle(Styles.selectedCell);
    setDragging(true);
    setYOnMouseDown(e.pageY);
    
    //e.target.cellIndex
  }

  return (
    <td className={style} onMouseDown={(e) => onMouseDown(e)}></td>
  )
}

export default Cell;