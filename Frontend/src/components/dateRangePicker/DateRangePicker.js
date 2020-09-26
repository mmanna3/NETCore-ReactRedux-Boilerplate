import React, {useState} from 'react';
import {Input} from 'components/Input'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'
import {convertirAString} from 'utils/Fecha'

const DateRangePicker = ({onChangeCallback}) => {
  
  const [value, onValueChange] = useState([new Date(), new Date()]);

  function onChange(value) {
    onValueChange(value);
    onChangeCallback([convertirAString(value[0]), convertirAString(value[1])]);
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
      <Input style={{display: 'none'}} name="desde" defaultValue={convertirAString(value[0])}/>
      <Input style={{display: 'none'}} name="hasta" defaultValue={convertirAString(value[1])}/>
    </div>
  )
}

export default DateRangePicker;
