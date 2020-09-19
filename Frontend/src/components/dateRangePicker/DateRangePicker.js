import React from 'react'
import Styles from './DateRangePicker.module.scss'
import Drp from '@wojtekmaj/react-daterange-picker'

const DateRangePicker = ({value, onChange}) => {  

  return (
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
  )
}

export default DateRangePicker;
