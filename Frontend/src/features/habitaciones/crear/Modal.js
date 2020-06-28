import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, InputWithoutLabel, Select } from "components/Input";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const {loading, validationErrors} = useSelector(crearHabitacionSelector)
  const [resetOnChanged, resetForm] = React.useState(0);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearHabitacion(data, onSuccess));  
  
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
      <Header title="Crear habitación" onHide={hide} />
      <Body>
        <ValidationSummary errors={validationErrors} />
        <Input label="Nombre" name="nombre" />
        <SelectCama />
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}


const SelectCama = () => {
  return (
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field is-expanded">
          <div className="field has-addons">
            <span className="control">
              <span className="button is-static">
                Cama
              </span>
            </span>
            <span className="control">
              <Select name="cama[0].tipo">
                <option value="1">Individual</option>
                <option value="2">Matrimonial</option>
                <option value="3">Marinera</option>
              </Select>
            </span>
            <span className="control">
              <span className="button is-static">
                Nº
              </span>
            </span>
            <span className="control is-expanded">
              <InputWithoutLabel name="cama[0].nombre"/>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crear