import React from 'react';
import Modal from 'components/Modal';
import Form from "components/Form";
import { Input, NumericInput, SubmitButton } from "components/Input";
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
        <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        
        {/* <Select name="sex" options={["female", "male"]} /> */}
        {( loading ? (<p> Loading...</p>) : <SubmitButton value="Submit" />)}
        
      </Form>

    </Modal> 
  )
}

export default Crear