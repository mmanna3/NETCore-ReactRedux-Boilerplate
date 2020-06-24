import React from 'react';
import {ModalForm, ModalContent, ModalFooter} from 'components/Modal';
import { Input, NumericInput, SubmitButton } from "components/Input";
import { crearHabitacion, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({esVisible, cerrar}) => {

  const { loading, hasSuccess } = useSelector(crearHabitacionSelector)

  const dispatch = useDispatch();
  const onSubmit = data => {console.log(data);dispatch(crearHabitacion(data));}

  console.log('Atroden Modal Crear');

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
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />        
      </ModalContent>
      <ModalFooter>        
        <div className="container">
          <div className="buttons is-pulled-right">                                      
            <button type="button" className="button" onClick={() => cerrar()}>Cancelar</button>
            <SubmitButton loading={loading} text="Guardar" />
          </div>
        </div>
      </ModalFooter>
    </ModalForm> 
  )
}

export default Crear