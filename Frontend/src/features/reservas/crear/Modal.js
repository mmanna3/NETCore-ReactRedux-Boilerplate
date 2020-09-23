import React, {useState, useEffect} from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from "components/Input";
import Select from "components/Select";
import ValidationSummary from "components/ValidationSummary";
import DateRangePicker from 'components/dateRangePicker/DateRangePicker';
import { crearReserva, cleanErrors, crearReservaSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHabitacionesConLugaresLibres, habitacionesSelector } from 'features/habitaciones/slice';
import {convertirAString} from 'utils/Fecha'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {  

  const {loading, validationErrors} = useSelector(crearReservaSelector);
  const [resetOnChanged, resetForm] = React.useState(0);
  const [desdeHasta, onDesdeHastaChange] = useState([convertirAString(new Date()), convertirAString(new Date())]);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearReserva(data, onSuccess));

  const { datos } = useSelector(habitacionesSelector);

  useEffect(() => {
    dispatch(fetchHabitacionesConLugaresLibres(desdeHasta[0], desdeHasta[1]));
  }, [dispatch, desdeHasta]);
  
  function onSuccess() {
    onSuccessfulSubmit();
    resetForm(resetOnChanged+1);
  }

  function hide() {
    onHide();
    dispatch(cleanErrors());
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
        <DateRangePicker onChangeCallback={onDesdeHastaChange} />
        <Select name="CamasIds[0]">
          {loading ?
            <option>Cargando..</option> :
            datos.map((habitacion) => {
              return <option>{habitacion.nombre} ({habitacion.cantidadDeLugaresLibres} lugares)</option>
            })
          }
        </Select>        
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;