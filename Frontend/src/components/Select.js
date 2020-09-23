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