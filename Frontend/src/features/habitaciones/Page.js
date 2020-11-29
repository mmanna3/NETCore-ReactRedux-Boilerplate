import React, { useState, useCallback } from 'react';
import Table from 'components/Table'
import { fetchHabitaciones, habitacionesSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import Crear from './crear/Modal'
import Detalle from './detalle/Modal'
import {Button} from 'components/botones/botones'


const HabitacionesPage = () => {
  const dispatch = useDispatch();
  const { datos, estado } = useSelector(habitacionesSelector);

  const fetchData = useCallback(() => {
    dispatch(fetchHabitaciones());
  }, [dispatch]);

  const columnas = [
    {
      Header: 'Nombre',
      accessor: 'nombre',
    },
    {
      Header: 'Camas matrimoniales',
      accessor: 'camasMatrimoniales.length',
    },
    {
      Header: 'Camas cuchetas',
      accessor: 'camasCuchetas.length',
    },
    {
      Header: 'Camas individuales',
      accessor: 'camasIndividuales.length',
    },
    {
      width: 300,
      Header: "",
      accessor: "id",
      Cell: ({ cell }) => (
        <Button onClick={e => {cambiarIdSeleccionadoParaDetalle(e.target.value); mostrarModalDeDetalle(true)}} value={cell.row.values.id} text="Ver detalle" />
      )
    }
  ]
  
  const [seMuestraModalDeCreacion, mostrarModalDeCreacion] = useState(false);
  const [seMuestraModalDeDetalle, mostrarModalDeDetalle] = useState(false);
  const [idSeleccionadoParaDetalle, cambiarIdSeleccionadoParaDetalle] = useState(null);

  function cerrarModalDeCreacionYRefrescarTabla() {
    mostrarModalDeCreacion(false);
    fetchData();
  }

  return (
    <div className="container">
        <Crear isVisible={seMuestraModalDeCreacion} onHide={() => mostrarModalDeCreacion(false)} onSuccessfulSubmit={cerrarModalDeCreacionYRefrescarTabla}></Crear>
        <Detalle id={idSeleccionadoParaDetalle} isVisible={seMuestraModalDeDetalle} onHide={() => mostrarModalDeDetalle(false)}></Detalle>
        
        <h1 className="title is-1">Habitaciones</h1>
        <div className="botonera">
          <div className="is-pulled-right">
            <Button onClick={() => mostrarModalDeCreacion(true)} text="Cargar nueva" />
          </div>
        </div>        
        <Table  fetchData={fetchData} 
                selector={habitacionesSelector} 
                columnas={columnas}
                datos={datos}
                estado={estado}
        />
    </div>
  )
}

export default HabitacionesPage