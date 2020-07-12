import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import 'utils/FontAwesomeLibrary';

import DashboardPage from './pages/DashboardPage'
import PostsPage from './pages/PostsPage'
import SinglePostPage from './pages/SinglePostPage'

import HuespedesPage from 'features/huespedes/Page'
import HabitacionesPage from 'features/habitaciones/Page'
import LoginPage from 'features/login/Page'

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/habitaciones" component={HabitacionesPage} />
        <Route exact path="/huespedes" component={HuespedesPage} />
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/posts" component={PostsPage} />
        <Route exact path="/posts/:id" component={SinglePostPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
