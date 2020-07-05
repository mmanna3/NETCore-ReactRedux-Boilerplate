import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, Button } from "components/Input";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'
import SelectCama from './SelectCama';

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const {loading, validationErrors} = useSelector(crearHabitacionSelector)
  const [resetOnChanged, resetForm] = React.useState(0);  
  const [camas, setCamas] = React.useState([{index: 0, esMarinera: false}]);

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
    setCamas(prevIndexes => [...prevIndexes, {index: nextIndex, esMarinera: false}]);
  }

  const removeCama = index => () => {
    setCamas(prevIndexes => [...prevIndexes.filter(item => item.index !== index)]);
  };

  function setCamaMarinera(index, value) {
    var newArray = [...camas]
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].index === index) {
        newArray[i].esMarinera = value;
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
        <Input label="Nombre" name="nombre" />        
          {camas.map(metadata => 
            <SelectCama key={`cama${metadata.index}`} 
                        index={metadata.index} 
                        esMarinera={metadata.esMarinera} 
                        setEsMarinera={setCamaMarinera} 
                        removeCama={removeCama}/>)
          }          
          <Button text="Agregar" onClick={() => addCama()} style={{marginTop:"1em"}}/>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;