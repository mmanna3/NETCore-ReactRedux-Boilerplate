import React, {useEffect, useCallback} from 'react'
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal'
import Display from "components/display/Display"
import { obtenerHabitacionPorId, obtenerHabitacionPorIdSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'

const Detalle = ({isVisible, onHide, id}) => {

  const dispatch = useDispatch();
  const { datos, estaCargando, tieneErrores } = useSelector(obtenerHabitacionPorIdSelector);

  const fetchData = useCallback(() => {
    if (id)
      dispatch(obtenerHabitacionPorId(id))
  }, [dispatch, id]);

  useEffect(() => fetchData(), [fetchData]);

  if (id && !estaCargando && !tieneErrores) {
   
    return (
      <ModalForm
          isVisible={isVisible}
          onHide={onHide}
      >
        <Header title="Detalle de habitación" onHide={onHide} />
        <Body>
          <div className="columns">
            <div className="column">
              <Display label="Nombre" defaultValue={datos.nombre} />
            </div>
            <div className="column">
              <Display label="Tiene baño" defaultValue={datos.tieneBanio} />
            </div>          
          </div>
        </Body>
        <FooterAcceptCancel onCancel={onHide} />
        
      </ModalForm> 
    )
  }
  return <></>
}

export default Detalle;