import React, {useCallback, useEffect} from 'react'
import { fetchCheckoutsDeHoy, checkoutsDeHoySelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import ESTADOS from 'redux/estadosFetch'
// import Estilos from './Componente.module.scss'

const CheckoutsDeHoy = () => {

  const dispatch = useDispatch();
  const { datos, estado } = useSelector(checkoutsDeHoySelector);

  const fetchData = useCallback(() => {
    dispatch(fetchCheckoutsDeHoy())
  }, [dispatch]);

  useEffect(() => fetchData(), [fetchData]);



  return (
    <div className="notification is-primary is-light">
      <button className="delete"></button>

      {estado === ESTADOS.huboError ? "Hubo un error." : 
          estado === ESTADOS.cargando ? "Cargando..." :
            estado === ESTADOS.exitoso ? 
              <>
                <strong>Checkouts de hoy</strong>
                <ul>
                  {datos.map(e => 
                    <li>{e.aNombreDe} (Habiación XXXXX)</li>
                  )}                  
                </ul>
              </>
              :
              <></>}
    </div>
  )
}

export default CheckoutsDeHoy;