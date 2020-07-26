import React from 'react';
import Styles from './Cell.module.scss'

const Cell = ({toggleIsSelecting, isSelecting}) => {  

  const [style, setStyle] = React.useState('');

  function onMouseEnter() {
    if (isSelecting) 
      setStyle(Styles.selectedCell);      
  }

  const onClick = () => {
    if (!isSelecting)
      setStyle(Styles.selectedCell);
    
      toggleIsSelecting();    
  }

  return (
    <td className={style} onClick={onClick} onMouseEnter={onMouseEnter}></td>
  )
}

export default Cell;