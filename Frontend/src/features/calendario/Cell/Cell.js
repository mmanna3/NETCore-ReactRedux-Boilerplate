import React from 'react';
import Styles from './Cell.module.scss'

const Cell = () => {

  const [style, setStyle] = React.useState('');

  return (
    <td className={style}></td>
  )
}

export default Cell;