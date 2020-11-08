import React, {useEffect, useCallback} from 'react'
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal'
import Display, {SiNo} from "components/display/Display"
import { obtenerHabitacionPorId, obtenerHabitacionPorIdSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import ESTADOS from 'redux/estadosFetch'

const Detalle = ({isVisible, onHide, id}) => {

  const dispatch = useDispatch();
  const { datos, estado } = useSelector(obtenerHabitacionPorIdSelector);

  const fetchData = useCallback(() => {
      dispatch(obtenerHabitacionPorId(id))
  }, [dispatch, id]);

  useEffect(() => fetchData(), [fetchData]);

  if (estado === ESTADOS.exitoso) {
    
    var esPrivada = {
      true: "Privada",
      false: "Compartida"
    }

    return (
      <ModalForm
          isVisible={isVisible}
          onHide={onHide}
      >
        <Header title="Detalle de habitación" onHide={onHide} />
        <Body>
          <div className="columns">
            <div className="column">
              <Display label="Nombre" valor={datos.nombre} />
            </div>
            <div className="column">
              <Display label="Tipo" valor={esPrivada[datos.esPrivada]} />
            </div>
            <div className="column">
              <SiNo label="Tiene baño" valor={datos.tieneBanio} />
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