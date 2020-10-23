import React from 'react';

export default function Checkbox({ register, name, onChange, label }) {
  return (
    <div className="field" style={{position:'relative',top:'10px'}}>
      <input className="is-checkradio has-background-color is-rtl" id={name} onChange={onChange} ref={register} type="checkbox" name={name} />
      <label style={{fontWeight:'bold', marginLeft:'0'}} htmlFor={name}>{label}</label>
    </div>
  );
}