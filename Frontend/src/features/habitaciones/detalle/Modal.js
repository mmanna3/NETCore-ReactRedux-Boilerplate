import React, {useEffect, useCallback} from 'react'
import { Modal, Body, Header, FooterAcceptCancel } from 'components/Modal'
import Display, { SiNo, DisplayLista, DisplayTextarea } from "components/display/Display"
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

    function calcularMaximoDeCamas() {
      var maximo = datos.camasMatrimoniales.length;
      if (datos.camasIndividuales.length > datos.camasMatrimoniales.length)
        maximo = datos.camasIndividuales.length;
      if (datos.camasCuchetas.length > datos.camasIndividuales.length)
        maximo = datos.camasIndividuales.length;

      return maximo;
    }

    const rowsDelTextAreaDeCamas = calcularMaximoDeCamas() + 1;

    return (
      <Modal
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
          <div className="columns">
            <div className="column">
              <DisplayLista label={`Camas Indiv. (${datos.camasIndividuales.length})`} 
                            lista={datos.camasIndividuales} 
                            rows={rowsDelTextAreaDeCamas} 
                            prop="nombre" />
            </div>
            <div className="column">
              <DisplayLista label={`Camas Matrim. (${datos.camasMatrimoniales.length})`} 
                            lista={datos.camasMatrimoniales} 
                            rows={rowsDelTextAreaDeCamas} 
                            prop="nombre" />
            </div>
            <div className="column">
              <DisplayLista label={`Camas Cuchetas (${datos.camasCuchetas.length})`} 
                            lista={datos.camasCuchetas} 
                            rows={rowsDelTextAreaDeCamas} 
                            prop="nombre" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <DisplayTextarea label="Información adicional" 
                               valor={datos.informacionAdicional} />
            </div>
          </div>
        </Body>
        <FooterAcceptCancel onCancel={onHide} />
        
      </Modal> 
    )
  }
  return <></>
}

export default Detalle;