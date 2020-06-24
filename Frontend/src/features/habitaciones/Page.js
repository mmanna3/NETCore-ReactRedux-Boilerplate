import React, { useState } from 'react';
import Tabla from 'components/Tabla'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch } from 'react-redux'
import Crear from './crear/Modal'

const HabitacionesPage = () => {
  const dispatch = useDispatch();

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Camas matrimoniales',
      accessor: 'camasMatrimoniales',
    },
    {
      Header: 'Camas marineras',
      accessor: 'camasMarineras',
    },
    {
      Header: 'Camas individuales',
      accessor: 'camasIndividuales',
    },
  ]
  
  const [modalEsVisible, togglearVisibilidadModal] = useState(false);  //TODO: Cambiar esto a estado string y ponérselo al componente bulma. 
                                                                        //Dos métodos: mostrar y ocultar

  function cerrarModalYRefrescarTabla() {
    togglearVisibilidadModal();
    dispatch(fetchHabitaciones());  //Probablemente esto corresponda hacerlo de alguna forma adentro de la tabla
  }

  return (
    <div className="container">
        <Crear esVisible={modalEsVisible} cerrarSinAcciones={togglearVisibilidadModal} cerrarConExito={cerrarModalYRefrescarTabla}></Crear>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="buttons is-fullwidth is-pulled-right">
          <button className="button is-primary" onClick={togglearVisibilidadModal}>Crear</button>
        </div>        
        <Tabla getData={fetchHabitaciones} selector={habitacionesSelector} columnas={columnas}/>
    </div>
  )
}

export default HabitacionesPage