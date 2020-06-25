import React from 'react'
import Form from "components/Form";

export const ModalForm = ({defaultValues, children, cerrar, esVisible, titulo, onSubmit}) => {  

  var visibilidad = {
    true: 'is-active',
    false: ''
  };

  return (
    <div className={`modal ${visibilidad[esVisible]}`}>
      <div className="modal-background" onClick={cerrar}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{titulo}</p>
          <button className="delete" aria-label="close" onClick={cerrar}></button>
        </header>
        <Form onSubmit={onSubmit}>
          {children}
        </Form>
      </div>
    </div>
  )
}

export const ModalFooter = ({children}) => {
  return (
    <footer className="modal-card-foot">
      {children}
    </footer>
  );
}

export const ModalContent = ({children}) => {
  return (
    <section className="modal-card-body" style={{width: 'inherit'}}>
      <div className="content">
        {children}
      </div>
  </section>
  );
}