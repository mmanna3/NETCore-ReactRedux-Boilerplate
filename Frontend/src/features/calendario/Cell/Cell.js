import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({startSelection, endSelection, daysSelectionStarted, canSelect}) => {

  const [style, setStyle] = React.useState('');

  function onMouseEnter() {
    if (canSelect())
      setStyle(Styles.selectedCell);
  }

  const onClick = () => {
    if (!daysSelectionStarted){
      setStyle(Styles.firstSelectedCell);
      startSelection();            
    } else {
      endSelection();
      setStyle(Styles.lastSelectedCell);
    }          
  }

  return (
    <td className={style} onClick={onClick} onMouseEnter={onMouseEnter}></td>
  )
}

export default Cell;