import React from 'react'

const CrearModal = ({mostrar}) => {
  
  let isActiveClass = "";
  if (mostrar)
    isActiveClass = "is-active";


  return (
    <div className={"modal "+isActiveClass}>
  <div className="modal-background"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Modal title</p>
      <button className="delete" aria-label="close"></button>
    </header>
    <section className="modal-card-body">
      <div className="content">
      <h1>Cuerpo assdas</h1>
      </div>
      
    </section>
    <footer className="modal-card-foot">
      <button className="button is-success">Save changes</button>
      <button className="button">Cancel</button>
    </footer>
  </div>
</div>
)
}

export default CrearModal