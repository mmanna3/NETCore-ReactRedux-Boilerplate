import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, Button, Label } from "components/Input";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'
import SelectCama from './SelectCama';

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const {loading, validationErrors} = useSelector(crearHabitacionSelector)
  const [resetOnChanged, resetForm] = React.useState(0);  
  const [camas, setCamas] = React.useState([{index: 0, tipo: 'Individuales'}]);

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

  function addCama() {
    var nextIndex = camas[camas.length - 1].index + 1;    
    setCamas(prevIndexes => [...prevIndexes, {index: nextIndex, tipo: 'Individuales'}]);
  }

  const removeCama = index => () => {
    if (camas.length > 1)
      setCamas(prevIndexes => [...prevIndexes.filter(item => item.index !== index)]);
  };

  function setTipoCama(index, value) {
    var newArray = [...camas]
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].index === index) {
        newArray[i].tipo = value;
        break;
      }
    }
    setCamas(newArray);
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
        <Input label="Nombre de la habitación" name="nombre" />
        <Label text="Camas"/>
          {camas.map(metadata => 
            <SelectCama key={`cama${metadata.index}`} 
                        index={metadata.index} 
                        tipo={metadata.tipo}
                        setTipoCama={setTipoCama}
                        removeCama={removeCama}/>)
          }          
          <Button text="Agregar cama" onClick={() => addCama()} style={{marginTop:"1em"}}/>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;