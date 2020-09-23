import React, {useState} from 'react';
import {Input} from 'components/Input'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'
import {convertirAString} from 'utils/Fecha'

const DateRangePicker = ({onChangeCallback}) => {
  
  const [value, onValueChange] = useState([new Date(), new Date()]);

  function onChange(value) {
    onValueChange(value);
    onChangeCallback([ajustarFechaDesde(value[0]), ajustarFechaHasta(value[1])]);
  }

  function ajustarFechaHasta(hasta) {
    var result = new Date(hasta);
    //Porque como tiene muchos 9 en los milisegundos, al pasar a ISOString redondea a un día más
    result.setDate(result.getDate()-1);    
    return convertirAString(result);
  }

  function ajustarFechaDesde(desde) {
    return convertirAString(desde);
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
