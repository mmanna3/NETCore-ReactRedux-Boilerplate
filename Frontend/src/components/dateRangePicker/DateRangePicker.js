import React from 'react';
import {Input} from 'components/Input'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'
import {convertirAString} from 'utils/Fecha'

const DateRangePicker = ({valor, actualizarValor}) => {    

  return (
    <div className="field">
      <label className="label">Desde - Hasta</label>
      <div className="control">
        <Drp
          onChange={actualizarValor}
          value={valor}
          className={Styles.dateRangePicker}
          calendarClassName={Styles.calendar}
          clearAriaLabel="Reiniciar"
          minDate={new Date()}
        />
      </div>
      <Input style={{display: 'none'}} name="desde" defaultValue={convertirAString(valor[0])}/>
      <Input style={{display: 'none'}} name="hasta" defaultValue={convertirAString(valor[1])}/>
    </div>
  )
}

export default DateRangePicker;
