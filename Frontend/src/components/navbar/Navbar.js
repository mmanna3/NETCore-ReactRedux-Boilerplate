import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const Navbar = () => {
  
  let a = JSON.parse(localStorage.getItem('user'));
  let nombre = a.firstName;

  return (
    <>

      <nav class={`navbar is-primary ${styles.spaceAtBottom}`} role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
              <Link class="navbar-item" to="/habitaciones">Habitaciones</Link>
              <Link class="navbar-item" to="/huespedes">Huéspedes</Link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-disabled is-primary">
                  <span>¡Hola  </span><strong> {nombre}</strong>!
                </a>
                <a class="button is-light">
                  Cerrar sesión
                </a>
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
