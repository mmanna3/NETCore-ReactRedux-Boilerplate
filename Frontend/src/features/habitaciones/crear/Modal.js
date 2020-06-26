import React from 'react';
import { ModalForm, Body, Header, FooterAceptarCancelar } from 'components/Modal';
import { Input, NumericInput } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const { loading, hasSuccess, hasErrors } = useSelector(crearHabitacionSelector)

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearHabitacion(data));
  
  if (hasSuccess)
    onSuccessfulSubmit();

  return (
    <ModalForm
        isVisible={isVisible}
        onHide={onHide}
        onSubmit={onSubmit}
        hasErrors={hasErrors}
    >
      <Header title="Crear habitación" onHide={onHide} />
      <Body>
        <Input label="Nombre" name="nombre" />
        <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
      </Body>
      <FooterAceptarCancelar cancelar={onHide} loading={loading} />
    </ModalForm> 
  )
}

export default Crear