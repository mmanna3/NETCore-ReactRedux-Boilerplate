import React from 'react';
import Modal from 'components/Modal';
import Form from "components/Form";
import { Input, SubmitButton } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({esVisible, cerrar}) => {

  const { loading, hasErrors } = useSelector(crearHabitacionSelector)

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
        <Input label="Camas individuales" name="camasIndividuales" type="number" />
        <Input label="Camas marineras" name="camasMarineras" type="number" />
        
        {/* <Select name="sex" options={["female", "male"]} /> */}
        {( loading ? (<p> Loading...</p>) : <SubmitButton value="Submit" />)}
        
      </Form>

    </Modal> 
  )
}

export default Crear