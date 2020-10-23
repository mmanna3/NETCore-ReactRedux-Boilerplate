import React from 'react';
import Label from 'components/Label'

export default function SiNo({ register, name, onChange, label }) {
  return (
    <div className="field">
      <Label text={label}/>
      <input className="is-checkradio" id={`${name}1`} onChange={onChange} ref={register} type="radio" name={name} defaultChecked="checked"/>
      <label style={{marginLeft:'0'}} htmlFor={`${name}1`}>Sí</label>

      <input className="is-checkradio" id={`${name}2`} onChange={onChange} ref={register} type="radio" name={name} />
      <label style={{marginLeft:'0'}} htmlFor={`${name}2`}>No</label>
    </div>
  );
}