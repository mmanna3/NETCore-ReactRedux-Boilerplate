import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchHabitaciones, habitacionesSelector } from '../slices/habitaciones'

//import { Post } from '../components/Post'

const HabitacionesPage = () => {
  const dispatch = useDispatch()
  const { habitaciones, loading, hasErrors } = useSelector(habitacionesSelector)

  useEffect(() => {
    dispatch(fetchHabitaciones())
  }, [dispatch])

  const render = () => {
    if (loading) return <p>Loading posts...</p>
    if (hasErrors) return <p>Unable to display posts.</p>

    //return posts.map(post => <Post key={post.id} post={post} excerpt />)
    return habitaciones.map(habitacion => <h2>{habitacion.nombre}</h2>)
  }

  return (
    <section>
      <h1>Posts</h1>
      {render()}
    </section>
  )
}

export default HabitacionesPage