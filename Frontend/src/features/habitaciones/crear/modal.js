import React from 'react';
import {ModalForm, ModalContent, ModalFooter} from 'components/Modal';
import { Input, NumericInput, SubmitButton } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({esVisible, cerrar}) => {

  const { loading, hasErrors, hasSuccess } = useSelector(crearHabitacionSelector)

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearHabitacion(data));

  if (hasSuccess)
    cerrar();

  return (
    <ModalForm
        cerrar={() => cerrar()} 
        esVisible={esVisible}
        titulo="Crear habitación"
        onSubmit={onSubmit}
    >      

      <ModalContent>
        <Input label="Nombre" name="nombre" />
        <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
      </ModalContent>
      <ModalFooter>
        <SubmitButton loading={loading} text="Guardar" />
      </ModalFooter>

    </ModalForm> 
  )
}

export default Crear