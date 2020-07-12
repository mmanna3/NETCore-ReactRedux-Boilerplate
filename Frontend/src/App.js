import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import 'utils/FontAwesomeLibrary';

import DashboardPage from './pages/DashboardPage'
import PostsPage from './pages/PostsPage'
import SinglePostPage from './pages/SinglePostPage'

import HuespedesPage from 'features/huespedes/Page'
import HabitacionesPage from 'features/habitaciones/Page'
import LoginPage from 'features/login/Page'

import Navbar from 'components/navbar/Navbar'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route component={RoutesWithNavbar}/>        
      </Switch>
    </Router>
  )
}

const RoutesWithNavbar = () => (
  <div>
    <Navbar />
    <Route exact path="/habitaciones" component={HabitacionesPage} />
    <Route exact path="/huespedes" component={HuespedesPage} />    
    <Route exact path="/dashboard" component={DashboardPage} />
    <Route exact path="/posts" component={PostsPage} />
    <Route exact path="/posts/:id" component={SinglePostPage} />
  </div>
);

export default App
