import React from 'react'
import Form from "components/Form";

export const Modal = ({children, cerrar, esVisible}) => {  

  var visibilidad = {
    true: 'is-active',
    false: ''
  };

  return (
    <div className={`modal ${visibilidad[esVisible]}`}>
      <div className="modal-background" onClick={cerrar}></div>
      <div className="modal-card">
          {children}
      </div>
    </div>
  )
}

export const ModalForm = ({children, cerrar, esVisible, titulo, onSubmit}) => {  

  return (
    <Modal cerrar={cerrar} esVisible={esVisible} titulo={titulo}>
        <Form onSubmit={onSubmit}>
          {children}
        </Form>
    </Modal>
  )
}

export const ModalHeader = ({titulo, cerrar}) => {
  return (
    <header className="modal-card-head">
    <p className="modal-card-title">{titulo}</p>
    <button type="button" className="delete" aria-label="close" onClick={cerrar}></button>
  </header>
  );
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