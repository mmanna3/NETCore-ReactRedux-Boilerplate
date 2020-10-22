import React from 'react';

export default function Select({ register, name, children, onChange, ccsClass, ...otrosAtributos }) {
  return (
    <div className={`select ${ccsClass}`}>
      <select name={name} ref={register} onChange={onChange} {...otrosAtributos}>
        {children}
      </select>
    </div>
  );
}

export function SelectConLabelInline({ register, name, children, onChange, ccsClass, label, ...otrosAtributos }) {
  return (
    <div className="field">
      <label style={{marginBottom: "1em"}}>
        <span style={{fontWeight: "bold",marginRight: "1em",top: "7px",position: "relative"}}>{label}</span>
        <Select register={register} name={name} children={children} onChange={onChange} ccsClass={ccsClass} {...otrosAtributos}></Select>
      </label>
    </div>
  );
}