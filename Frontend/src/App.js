import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import 'utils/FontAwesomeLibrary';

import HuespedesPage from 'features/huespedes/Page'
import ReservasPage from 'features/reservas/Page'
import HabitacionesPage from 'features/habitaciones/Page'
import CalendarioPage from 'features/calendario/Page'
import LoginPage from 'features/login/Page'
import Navbar from 'components/navbar/Navbar'
import axios from 'axios';

const App = () => {
  //Para que se ejecute si se actualiza la página (con F5 o de otra forma)
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token)
    axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`}

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route component={AuthRoutes}/>
      </Switch>
    </Router>
  )
}

const AuthRoutes = () => {
  if (localStorage.getItem('user') == null)
    return <Redirect
              to={{
                pathname: "/"
              }}
          />
  else
    return (
    <div>
      <Navbar />
      <Route exact path="/habitaciones" component={HabitacionesPage} />
      <Route exact path="/huespedes" component={HuespedesPage} />
      <Route exact path="/reservas" component={ReservasPage} />
      <Route exact path="/calendario" component={CalendarioPage} />
    </div>
)};

export default App
