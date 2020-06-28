import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, NumericInput, Select } from "components/Input";
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
      <div>
        <h1>a</h1>
      </div>
      <Header title="Crear habitación" onHide={hide} />
      <Body>
        <ValidationSummary errors={validationErrors} />
        <Input label="Nombre" name="nombre" />
        <SelectCama />
        {/* <NumericInput label="Camas matrimoniales" name="camasMatrimoniales" />
        <NumericInput label="Camas marineras" name="camasMarineras" type="number" />
        <NumericInput label="Camas individuales" name="camasIndividuales" type="number" />
        <Select name="camas[0].tipo">
          <option value="1">Individual</option>
          <option value="2">Matrimonial</option>
          <option value="3">Marinera</option>
        </Select>
        <NumericInput label="Camas" name="camas[0].cantidad" />
        <Select name="camas[1].tipo">
          <option value="1">Individual</option>
          <option value="2">Matrimonial</option>
          <option value="3">Marinera</option>
        </Select> */}
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}


const SelectCama = () => {
  return         <div className="field is-horizontal">
  <div className="field-body">
    <div className="field is-expanded">
      <div className="field has-addons">
        <p className="control">
          <a className="button is-static">
            Cama
          </a>
        </p>
        <p className="control">
        <Select name="cama">
          <option value="1">Individual</option>
          <option value="2">Matrimonial</option>
          <option value="3">Marinera</option>
        </Select>
        </p>
        <p className="control">
          <a className="button is-static">
            Nº
          </a>
        </p>
        <p className="control is-expanded">
          <input className="input" name="camas[0].cantidad" />    
        </p>
      </div>
    </div>
  </div>
</div>
}

export default Crear