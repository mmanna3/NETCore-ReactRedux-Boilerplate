import React from 'react';

export default function Textarea({ register, name, rows, placeholder }) {
  return (
    <textarea className="textarea" ref={register} name={name} rows={rows} placeholder={placeholder}></textarea>
  );
}