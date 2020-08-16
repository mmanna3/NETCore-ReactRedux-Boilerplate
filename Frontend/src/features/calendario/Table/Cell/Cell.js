import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({id, startSelection, endSelection, selectionData, canBeSelected}) => {

  const [style, setStyle] = React.useState('');
  const [isSelected, setIsSelected] = React.useState(false);

  function onMouseEnter() {
    console.log(`MOUSEENTER:${id}`);    
    if (canBeSelected() && !isSelected)
      select();      
  }

  const select = () => {
    setStyle(Styles.selectedCell);
    setIsSelected(true);
  }

  const cancelSelection = () => {
    endSelection();
  }

  const onMouseDown = (e) => {    
    e.preventDefault();

    if (isSelected) {
      cancelSelection();
    }

    if (!selectionData.hasStarted) {      
      setStyle(Styles.firstSelectedCell);
      setIsSelected(true);
      startSelection();     
    }     
  }

  const onMouseUp = (e) => {
    if (selectionData.hasStarted) {
      e.preventDefault();
      setIsSelected(false);
      endSelection();    
      setStyle(Styles.lastSelectedCell);
    }
  }

  return (
    <td className={`${id} ${style}`} onMouseUp={(e) => onMouseUp(e)} onMouseDown={(e) => onMouseDown(e)} onMouseEnter={onMouseEnter}></td>
  )
}

export default Cell;