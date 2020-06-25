import React from 'react';
import { ModalForm, Body, Header, FooterAceptarCancelar } from 'components/Modal';
import { Input, NumericInput } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({isVisible, close, onSuccessfulSubmit}) => {

  const { loading, hasSuccess } = useSelector(crearHabitacionSelector)

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearHabitacion(data));
  
  if (hasSuccess)
    onSuccessfulSubmit();

  return (
    <ModalForm
        hide={close}
        isVisible={isVisible}
        onSubmit={onSubmit}
    >
      <Header title="Crear habitación" hide={close} />
      <Body>
        <Input label="Nombre" name="nombre" />
        <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
      </Body>
      <FooterAceptarCancelar cancelar={close} loading={loading} />
    </ModalForm> 
  )
}

export default Crear