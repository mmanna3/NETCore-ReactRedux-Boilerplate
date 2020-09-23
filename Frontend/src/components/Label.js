import React from "react";

export default function Label({ text, ...otrosAtributos }) {
  return (
      <label className="label" {...otrosAtributos}>{text}</label>
  )
}