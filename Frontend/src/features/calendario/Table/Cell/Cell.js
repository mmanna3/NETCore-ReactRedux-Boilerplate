import React from 'react';
import Styles from './Cell.module.scss'
import { getCamaDiaInfo, seleccionarUnSoloDiaEnUnaSolaCama } from 'features/calendario/reservasDelMes/helper'

const Cell = ({row, column}) => {

  const [style, setStyle] = React.useState('');
  
  const onClick = () => {
    var selectedCssClassesMap = {
      "none": Styles.unselected,
      "yes": Styles.selected,
      "unique": `${Styles.selected} ${Styles.firstSelected} ${Styles.lastSelected}`
    };
    
    seleccionarUnSoloDiaEnUnaSolaCama(row, column);

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