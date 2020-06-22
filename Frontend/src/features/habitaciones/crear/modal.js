import React from 'react';
import Modal from 'components/Modal';
import Form from "components/Form";
import { Input, SubmitButton } from "components/Input";
import { useDispatch } from 'react-redux'
import { crearHabitacion } from './slice';

const Crear = ({esVisible, cerrar}) => {

  const dispatch = useDispatch();    
  const onSubmit = data => dispatch(crearHabitacion(data));

  return (
    <Modal
        cerrar={() => cerrar()} 
        esVisible={esVisible}
        titulo="Crear habitación"
    >
      
      <Form onSubmit={onSubmit}>
        <Input label="Nombre" name="nombre" />
        <Input label="Camas matrimoniales" name="camasMatrimoniales" type="number" />
        {/* <Select name="sex" options={["female", "male"]} /> */}

        <SubmitButton value="Submit" />
      </Form>

    </Modal> 
  )
}

export default Crear