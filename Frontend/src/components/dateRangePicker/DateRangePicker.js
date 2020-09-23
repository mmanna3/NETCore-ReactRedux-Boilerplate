import React from 'react'
import {Input} from 'components/Input'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'

const DateRangePicker = ({value, onChange}) => {  
  
  function ajustarFechaHasta(hasta) {
    var result = new Date(hasta);
    //Porque como tiene muchos 9 en los milisegundos, al pasar a ISOString redondea a un día más
    result.setDate(result.getDate()-1);    
    return result.toISOString().slice(0,10);    
  }

  function ajustarFechaDesde(desde) {
    return desde.toISOString().slice(0,10);
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
      <Input style={{display: 'none'}} name="desde" defaultValue={ajustarFechaDesde(value[0])}/>
      <Input style={{display: 'none'}} name="hasta" defaultValue={ajustarFechaHasta(value[1])}/>
    </div>
  )
}

export default DateRangePicker;
