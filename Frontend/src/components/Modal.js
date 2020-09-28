import React from 'react'
import Form from "components/Form";
import {SubmitButton} from "components/Buttons";

export const Modal = ({children, onHide, isVisible, minWidth}) => {  

  var visibility = {
    true: 'is-active',
    false: ''
  };

  return (
    <div className={`modal ${visibility[isVisible]}`}>
      <div className="modal-background" onClick={onHide}></div>
      <div className="modal-card" style={{minWidth: minWidth}}>
          {children}
      </div>
    </div>
  )
}

export const ModalForm = ({children, onHide, isVisible, onSubmit, resetOnChanged, minWidth}) => {  

  return (
    <Modal onHide={onHide} isVisible={isVisible} minWidth={minWidth}>
        <Form onSubmit={onSubmit} resetOnChanged={resetOnChanged}>
          {children}
        </Form>
    </Modal>
  )
}

export const Header = ({title, onHide}) => {
  return (
    <header className="modal-card-head">
    <p className="modal-card-title">{title}</p>
    <button type="button" className="delete" aria-label="close" onClick={onHide}></button>
  </header>
  );
}

export const Footer = ({children}) => {
  return (
    <footer className="modal-card-foot">
      <div className="container">
        <div className="buttons is-pulled-right">
          {children}
        </div>
      </div>
    </footer>
  );
}

export const FooterAcceptCancel = ({onCancel, loading}) => {
  return (
    <Footer>
      <button type="button" className="button" onClick={onCancel}>Cancelar</button>
      <SubmitButton loading={loading} text="Confirmar" />
    </Footer>
  );
}

export const Body = ({children, minHeight}) => {
  return (
    <section className="modal-card-body" style={{width: 'inherit', minHeight: minHeight}}>
      <div className="content">
        {children}
      </div>
  </section>
  );
}