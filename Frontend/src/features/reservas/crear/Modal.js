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
import {convertirAString, hoy, maniana} from 'utils/Fecha'
import SelectCama from './SelectCama'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {  

  const {loading, validationErrors} = useSelector(crearReservaSelector);
  const [resetOnChanged, resetForm] = React.useState(0);
  debugger;
  const [desdeHasta, actualizarDesdeHasta] = useState([hoy(), maniana()]);
  const [camas, actualizarCamas] = useState([{indiceGlobal:0, indice: 0, camasDisponibles:[]}]);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearReserva(data, onSuccess));

  const habRequest = useSelector(habitacionesSelector);
  const habitacionesCargando = habRequest.estaCargando;
  const habitaciones = habRequest.datos;

  useEffect(() => {
    dispatch(fetchHabitacionesConLugaresLibres(convertirAString(desdeHasta[0]), convertirAString(desdeHasta[1])));
  }, [dispatch, desdeHasta]);

  useEffect(() => {
    if (habitaciones.length > 0)
      actualizarCamas([{indiceGlobal:0, indice: 0, camasDisponibles:habitaciones[0].camas}]);      
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

  function onHabitacionChange(indiceGlobal, e) {
    actualizarCamasDisponibles(indiceGlobal, habitaciones[e.target.value]);
  }

  const actualizarCamasDisponibles = (indiceGlobal, habitacion) => {
    var camasCopia = camas;

    for (let i = 0; i < camas.length; i++)
      if (camasCopia[i].indiceGlobal === indiceGlobal) {
        camasCopia[i].camasDisponibles = habitacion.camas;
        break;
      }      

    actualizarCamas([...camasCopia]);
  }

  function agregarCama() {
    var ultimaCama = camas.slice(-1).pop();
    var proximoIndiceGlobal = ultimaCama.indiceGlobal + 1;
    var proximoIndice = ultimaCama.indice + 1;
    
    actualizarCamas([...camas, {indiceGlobal: proximoIndiceGlobal, indice: proximoIndice, camasDisponibles: habitaciones[0].camas}]);
  }

  function eliminarCama(indiceGlobal) {
    if (camas.length > 1) {
      var camasSinLaBorrada = camas.filter(cama => cama.indiceGlobal !== indiceGlobal);
      actualizarIndices(camasSinLaBorrada);
      actualizarCamas(camasSinLaBorrada);
    }      
  };

  function actualizarIndices(camas){
    for (let i = 0; i < camas.length; i++)
      if (camas[i].indice !== i)
        camas[i].indice = i;
  }

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
        <Input label="Huesped" name="aNombreDe" />
        <DateRangePicker actualizarValor={actualizarDesdeHasta} etiqueta="Check in - Check out" valor={desdeHasta}/>
        <Label text="Camas"/>

        {
          camas.map((cama) => {
            
            return <SelectCama
              key={`${cama.indiceGlobal}`}
              cama={cama}
              habitaciones={habitaciones}
              cargando={habitacionesCargando}
              onHabitacionChange={(e) => onHabitacionChange(cama.indiceGlobal, e)}
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