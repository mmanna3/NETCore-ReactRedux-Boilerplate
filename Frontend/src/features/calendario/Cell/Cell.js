import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({startSelection, endSelection, selectionData, canBeSelected, canBeClickedForEndingSelection}) => {

  const [style, setStyle] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(false);

  function onMouseEnter() {
    if (canBeSelected())
      select();      
  }

  const select = () => {
    setStyle(Styles.selectedCell);
  }

  const onClick = () => {
    
    if (!selectionData.hasStarted){
      setStyle(Styles.firstSelectedCell);
      startSelection();            
    } else {
      // if (canBeClickedForEndingSelection()) {
        endSelection();
        setStyle(Styles.lastSelectedCell);
      // }
    }          
  }

  return (
    <td className={style} onClick={onClick} onMouseEnter={onMouseEnter}></td>
  )
}

export default Cell;