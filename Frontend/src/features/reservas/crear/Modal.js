import React, {useState, useEffect} from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from "components/Input";
import Select from "components/Select";
import Label from "components/Label";
import ValidationSummary from "components/ValidationSummary";
import DateRangePicker from 'components/dateRangePicker/DateRangePicker';
import { crearReserva, cleanErrors, crearReservaSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitacionesConLugaresLibres, habitacionesSelector } from 'features/habitaciones/conLugaresLibresSlice';
import {convertirAString} from 'utils/Fecha'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {  

  const {loading, validationErrors} = useSelector(crearReservaSelector);
  const [resetOnChanged, resetForm] = React.useState(0);
  const [desdeHasta, actualizarDesdeHasta] = useState([new Date(), new Date()]);
  const [camasDisponibles, actualizarCamasDisponibles] = useState([]);

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
      actualizarCamasDisponibles(habitaciones[0].camas);
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

  function onHabitacionChange(e) {
    actualizarCamasDisponibles(habitaciones[e.target.value].camas);
  }

  return (
    <ModalForm
        isVisible={isVisible}
        onHide={hide}
        onSubmit={onSubmit}
        resetOnChanged={resetOnChanged}
    >
      <Header title="Alta de reserva" onHide={hide} />
      <Body>
        <ValidationSummary errors={validationErrors} />
        <Input label="Huesped" name="aNombreDe" />
        <DateRangePicker actualizarValor={actualizarDesdeHasta} valor={desdeHasta}/>
        <Label text="Camas"/>
        <Select name="Habitacion" onChange={onHabitacionChange}>
          {habitacionesCargando ?
            <option>Cargando habitación..</option> :
            habitaciones.map((habitacion, index) => {
              return <option key={habitacion.Id} value={index}>{habitacion.nombre} ({habitacion.cantidadDeLugaresLibres} lugares)</option>
            })
          }
        </Select>
        <Select name="CamasIds[0]">
          {camasDisponibles.length === 0 ?
            <option>No hay camas disponibles</option> :
            camasDisponibles.map((cama) => {
              return <option key={cama.id} value={cama.id}>{cama.tipo} - {cama.nombre}</option>
            })
          }
        </Select>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;