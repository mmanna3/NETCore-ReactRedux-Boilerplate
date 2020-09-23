import React from 'react'
import {Input} from 'components/Input'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'

const DateRangePicker = ({value, onChange}) => {  

  //Porque como tiene muchos 9 en los milisegundos, al pasar a ISOString redondea a un día más
  function ajustarFechaHasta(hasta) {
    var result = new Date(hasta);
    result.setDate(result.getDate() -1);
    return result;
  }

  return (
    <div className="field">
      <label className="label">Desde - Hasta</label>
      <div className="control">
        <Drp
          onChange={onChange}
          value={value}
          className={Styles.dateRangePicker}
          calendarClassName={Styles.calendar}
          clearAriaLabel="Reiniciar"
          minDate={new Date()}
        />
      </div>
      <Input style={{display: 'none'}} name="desde" defaultValue={value[0].toISOString().slice(0,10)}/>
      <Input style={{display: 'none'}} name="hasta" defaultValue={ajustarFechaHasta(value[1]).toISOString().slice(0,10)}/>
    </div>
  )
}

export default DateRangePicker;
