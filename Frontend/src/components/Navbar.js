import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav>
    <section>
      <Link to="/habitaciones">Habitaciones</Link>
      <Link to="/huespedes">Huéspedes</Link>
    </section>
  </nav>
);

export default Navbar;
