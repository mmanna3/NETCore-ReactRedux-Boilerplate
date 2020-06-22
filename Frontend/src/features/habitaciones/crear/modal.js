import React from 'react';
import Modal from 'components/Modal';
import Form from "components/Form";
import { Input } from "components/Input";
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
        <Input name="nombre" />
        <Input name="lastName" />
        {/* <Select name="sex" options={["female", "male"]} /> */}

        <Input type="submit" value="Submit" />
      </Form>

    </Modal> 
  )
}

export default Crear