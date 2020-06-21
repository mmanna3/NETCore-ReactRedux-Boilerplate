import React from 'react'

const Modal = ({children, cerrar, esVisible, titulo}) => {
  
  if(!esVisible) {
    return null;
  }

  return (
    <div className={"modal is-active"}>
      <div className="modal-background" onClick={cerrar}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{titulo}</p>
          <button className="delete" aria-label="close" onClick={cerrar}></button>
        </header>
        <section className="modal-card-body" style={{width: 'inherit'}}>
          <div className="content">
            {children}
          </div>      
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary">Save changes</button>
          <button className="button" onClick={cerrar}>Cancel</button>
        </footer>
      </div>
    </div>
  )
}

export default Modal