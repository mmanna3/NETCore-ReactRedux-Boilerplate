import React from "react";
import Estilos from './Display.module.scss'

export default function Display({ label, valor }) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input readOnly className={`${Estilos.display} input`} defaultValue={valor} />
      </div>
    </div>
  )
}

export function SiNo({ label, valor }) {
  
  var siNo = {
    true: "Sí",
    false: "No"
  };
  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input readOnly className={`${Estilos.display} input`} defaultValue={siNo[valor]} />
      </div>
    </div>
  )
}

export function DisplayList({ label, lista, prop, rows }) {
  
  var valor = "";
  
  lista.forEach(e => {
    valor += `• ${e[prop] + String.fromCharCode(13, 10)}`;
  });
  

  
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea style={{height:'auto'}} readOnly rows={rows} className={`${Estilos.display} input`} defaultValue={valor} />
      </div>
    </div>
  )
}