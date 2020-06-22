import React from "react";

export function Input({ register, label, name, ...otrosAtributos }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" name={name} ref={register} {...otrosAtributos} />
        {/* <input class="input is-danger has-icons-right" name={name} ref={register} type="text"/>
         <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>           
        </span> */}
      </div>
      {/* <p class="help is-danger">This email is invalid</p> */}
      
    </div>
  )
}

export function NumericInput({ register, label, name, ...otrosAtributos }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input className="input" name={name} ref={register} {...otrosAtributos} type="number" defaultValue="0"/>
        {/* <input class="input is-danger has-icons-right" name={name} ref={register} type="text"/>
         <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>           
        </span> */}
      </div>
      {/* <p class="help is-danger">This email is invalid</p> */}
      
    </div>
  )
}

export function SubmitButton({ label, ...otrosAtributos }) {
  return (
    <input className="button is-primary" type="submit" value={label} {...otrosAtributos} />    
  )
}

export function Select({ register, options, name, ...rest }) {
  return (
    <select name={name} ref={register} {...rest}>
      {options.map(value => (
        <option value={value}>{value}</option>
      ))}
    </select>
  );
}