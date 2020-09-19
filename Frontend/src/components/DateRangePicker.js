import React from 'react'
import Drp from '@wojtekmaj/react-daterange-picker'

const DateRangePicker = ({value, onChange}) => {  

  return <Drp
    onChange={onChange}
    value={value}
  />
}

export default DateRangePicker;
