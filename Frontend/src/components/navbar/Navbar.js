import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import BotonCerrarSesion from './botonCerrarSesion/botonCerrarSesion';
import styles from './Navbar.module.css'
import { obtenerUsuarioLogueado } from 'features/login/servicio'

const Navbar = () => {    
  let nombre = obtenerUsuarioLogueado().firstName;

  const [isBurguerActive, setIsBurguerActive] = useState('');

  function onNavbarBurguerClick(){
    
    if (isBurguerActive === '')
      setIsBurguerActive('is-active');
    else
      setIsBurguerActive('');
  }

  return (
    <>
      <nav className={`navbar is-primary ${styles.spaceAtBottom}`} role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a role="button" className={`navbar-burger burger ${isBurguerActive}`} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" href="# " onClick={onNavbarBurguerClick}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isBurguerActive}`}>
          <div className="navbar-start">
              <Link className="navbar-item has-text-weight-medium" to="/habitaciones">Habitaciones</Link>
              {/* <Link className="navbar-item has-text-weight-medium" to="/huespedes">Huéspedes</Link>
              <Link className="navbar-item has-text-weight-medium" to="/calendario">Calendario</Link> */}
              <Link className="navbar-item has-text-weight-medium" to="/reservas">Reservas</Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <p className="button is-primary is-hidden-touch">
                  <span>¡Hola  </span><strong>{nombre}</strong>!
                </p>
                <BotonCerrarSesion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>
  )
};

export default Navbar;
