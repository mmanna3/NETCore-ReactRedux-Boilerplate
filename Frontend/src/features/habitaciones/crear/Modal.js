import React from 'react';
import {ModalForm, Body, Header, FooterAceptarCancelar} from 'components/Modal';
import { Input, NumericInput } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({esVisible, cerrarSinAcciones, cerrarConExito}) => {

  const { loading, hasSuccess } = useSelector(crearHabitacionSelector)

  const dispatch = useDispatch();
  const onSubmit = data => {console.log(data);dispatch(crearHabitacion(data));}

  console.log('Atroden Modal Crear');

  if (hasSuccess)
    cerrarConExito();

  return (
    <ModalForm
        cerrar={cerrarSinAcciones}
        esVisible={esVisible}
        titulo="Crear habitación"
        onSubmit={onSubmit}
    >
      <Header titulo="Crear habitación" cerrar={cerrarSinAcciones} />
      <Body>
        <Input label="Nombre" name="nombre" />
        <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
      </Body>
      <FooterAceptarCancelar cancelar={cerrarSinAcciones} loading={loading} />
    </ModalForm> 
  )
}

export default Crear