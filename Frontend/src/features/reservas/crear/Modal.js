import React, {useState, useEffect } from 'react'
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal'
import { Input } from "components/Input"
import {Button} from "components/Buttons"
import Label from "components/Label"
import ValidationSummary from "components/ValidationSummary"
import DateRangePicker from 'components/dateRangePicker/DateRangePicker'
import { crearReserva, cleanErrors, crearReservaSelector } from './slice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHabitacionesConLugaresLibres, habitacionesSelector } from 'features/habitaciones/conLugaresLibresSlice'
import {convertirAString, hoy, maniana, restarFechas} from 'utils/Fecha'
import SelectCama from './SelectCama/SelectCama'
import Estilos from './Modal.module.scss'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {  

  class Renglon {
    constructor(indiceGlobal, camasDisponibles) {
      this.indiceGlobal = indiceGlobal;
      this.camasDisponibles = camasDisponibles;
    }
  }
  
  
  const {loading, validationErrors} = useSelector(crearReservaSelector);
  const [resetOnChanged, resetForm] = React.useState(0);
  const [desdeHasta, actualizarDesdeHasta] = useState([hoy(), maniana()]);
  const [cantidadDeNoches, actualizarCantidadDeNoches] = useState(1);
  const [renglones, actualizarRenglones] = useState([new Renglon(0, [])]);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearReserva(data, onSuccess));

  const habRequest = useSelector(habitacionesSelector);
  const habitacionesCargando = habRequest.estaCargando;
  const habitaciones = habRequest.datos;

  useEffect(() => {
    
    function restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento() {
      let milisegundosDeUnDia = (24*60*60*1000) * 1;
      let resultado = new Date(desdeHasta[1]);
      resultado.setTime(resultado.getTime() - milisegundosDeUnDia);
      return resultado;
    }
    
    let hasta = restarUnDiaAlHastaDelCalendarioPorqueElCheckoutNoLocuento();    
    dispatch(fetchHabitacionesConLugaresLibres(convertirAString(desdeHasta[0]), convertirAString(hasta)));
    actualizarCantidadDeNoches(restarFechas(desdeHasta[1], desdeHasta[0]));
  }, [dispatch, desdeHasta, cantidadDeNoches]);
  
  useEffect(() => {
    if (habitaciones.length > 0)
      actualizarRenglones([new Renglon(0, habitaciones[0].camas)]);
    //PORQUE QUIERE QUE RENGLÓN SEA DEPENDENCIA Y SE ROMPE TODO SI LO PONGO
    // eslint-disable-next-line
  }, [habitaciones]);

  function onSuccess() {
    actualizarDesdeHasta([new Date(), new Date()]);    
    onSuccessfulSubmit();
    resetForm(resetOnChanged+1);
  }

  function hide() {
    onHide();
    dispatch(cleanErrors());
  }

  function onHabitacionChange(indiceGlobal, id) {
    var hab = habitaciones.find(hab => hab.id === parseInt(id));
    actualizarCamasDisponibles(indiceGlobal, hab);
  }

  const actualizarCamasDisponibles = (indiceGlobal, habitacion) => {
    var camasCopia = renglones;

    for (let i = 0; i < renglones.length; i++)
      if (camasCopia[i].indiceGlobal === indiceGlobal) {
        camasCopia[i].camasDisponibles = habitacion.camas;
        break;
      }      

    actualizarRenglones([...camasCopia]);
  }

  function agregarCama() {
    var ultimoRenglon = renglones.slice(-1).pop();
    var proximoIndiceGlobal = ultimoRenglon.indiceGlobal + 1;
    
    actualizarRenglones([...renglones, new Renglon(proximoIndiceGlobal, habitaciones[0].camas)]);
  }

  function eliminarCama(indiceGlobal) {
    if (renglones.length > 1) {
      var camasSinLaBorrada = renglones.filter(cama => cama.indiceGlobal !== indiceGlobal);
      actualizarRenglones(camasSinLaBorrada);
    }      
  };

  return (
    <ModalForm
        isVisible={isVisible}
        onHide={hide}
        onSubmit={onSubmit}
        resetOnChanged={resetOnChanged}
        minWidth="680px"
    >
      <Header title="Alta de reserva" onHide={hide} />
      <Body minHeight="420px">
        <ValidationSummary errors={validationErrors} />
        <Input label="Huésped" name="aNombreDe" />
        <DateRangePicker actualizarValor={actualizarDesdeHasta} etiqueta="Check in - Check out" valor={desdeHasta}/>
        <p className={Estilos.noches}><strong>Noches: </strong>{cantidadDeNoches}</p>
        <Label text="Camas"/>

        {
          renglones.map((renglon) => {
            
            return <SelectCama
              key={`${renglon.indiceGlobal}`}
              renglon={renglon}
              habitaciones={habitaciones}
              cargando={habitacionesCargando}
              onHabitacionChange={(e) => onHabitacionChange(renglon.indiceGlobal, e.target.value)}
              eliminar={eliminarCama}
            />
          }
          )
        }


        
        

        <Button text="Agregar cama" onClick={agregarCama} style={{marginTop:"1em"}}/>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;