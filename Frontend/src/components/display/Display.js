import React from "react";
import Estilos from './Display.module.scss'

export default function Display({ register, label, name, ...otrosAtributos }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input readOnly className={`${Estilos.display} input`} name={name} ref={register} {...otrosAtributos} />
      </div>
    </div>
  )
}