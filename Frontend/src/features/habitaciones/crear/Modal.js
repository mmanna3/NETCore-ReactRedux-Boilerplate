import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from "components/Input";
import { Button } from "components/Buttons";
import Select from "components/Select";
import ValidationSummary from "components/ValidationSummary";
import Label from "components/Label";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'
import SelectCama from './SelectCama';
import SiNo from 'components/SiNo';
import Textarea from 'components/Textarea';

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const {loading, validationErrors} = useSelector(crearHabitacionSelector)
  const [resetOnChanged, resetForm] = React.useState(0);
  const [camas, setCamas] = React.useState([{index: 0, tipo: 'Individuales', globalIndex: 0, value: ''}]);

  const dispatch = useDispatch();
  const onSubmit = data => dispatch(crearHabitacion(data, onSuccess));  
  
  function onSuccess() {
    onSuccessfulSubmit();
    resetForm(resetOnChanged+1);
    setCamas([{index: 0, tipo: 'Individuales', globalIndex: 0, value: ''}]);
  }

  function hide() {
    onHide();
    dispatch(cleanErrors());
    setCamas([{index: 0, tipo: 'Individuales', globalIndex: 0, value: ''}]);
  }

  function getNextCamaIndex(array, tipo) {
    var cama = array.slice().reverse().find(x => x.tipo === tipo);    
    return cama ? cama.index + 1 : 0;
  }

  function getNextGlobalIndex(array) {
    var camasReverse = array.slice().reverse();
    return camasReverse[0].globalIndex + 1;
  }

  function addCama() {
    var nextIndex = getNextCamaIndex(camas, 'Individuales');
    setCamas(prevIndexes => [...prevIndexes, {index: nextIndex, tipo: 'Individuales', globalIndex: getNextGlobalIndex(camas)}]);
  }

  const removeCama = globalIndex => () => {
    if (camas.length > 1) {
      var newArray = camas.filter(item => item.globalIndex !== globalIndex);
      updateCamaIndexes(newArray);
      setCamas(newArray);
    }      
  };

  function setValue(globalIndex, value){
    var newArray = [...camas];
    
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].globalIndex === globalIndex) {
        newArray[i].value = value;
        break;
      }
    }

    setCamas(newArray);
  }

  function setTipoCama(index, oldTipo, newTipo) {
    var newArray = [...camas];
    
    for (var i = 0; i < newArray.length; i++) {
      if (newArray[i].index === index && newArray[i].tipo === oldTipo) {
        newArray[i].index = getNextCamaIndex(newArray, newTipo);
        newArray[i].tipo = newTipo;
        newArray[i].value = {};
        break;
      }
    }

    updateCamaIndexes(newArray);
    setCamas(newArray);
  }

  function updateCamaIndexes(array){
    
    updatePorTipo(array, 'Individuales');
    updatePorTipo(array, 'Matrimoniales');
    updatePorTipo(array, 'Cuchetas');

    function updatePorTipo(array, tipo){
      var arrayDelTipo = array.filter(x => x.tipo === tipo);
      
      for (let i = 0; i < arrayDelTipo.length; i++)
        if (arrayDelTipo[i].index !== i)
          arrayDelTipo[i].index = i;
    }
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
        
        <div className="columns">
          <div className="column">
            <Label text="Tipo"/>
            <Select name="esPrivada">
              <option value="true">Compartida</option>
              <option value="false">Privada</option>
            </Select>
          </div>
          <div className="column">
            <SiNo name="tieneBanio" label="Baño privado" />
          </div>
          <div className="column is-two-fifths">
            <div className="field">
              <Label text="Información adicional"/>
              <Textarea rows="3" name="informacionAdicional" placeholder="Ej.: tiene rampa para discapacitados" />
            </div>            
          </div>
        </div>


        <div className="field">
        <Label text="Camas"/>
          {camas.map(cama => {
            return <SelectCama key={`${cama.globalIndex}`}
                        cama={cama}
                        setTipoCama={setTipoCama}
                        removeCama={removeCama}
                        setValue={setValue}
                    />
          })
          }          
          <Button text="Agregar cama" onClick={() => addCama()} style={{marginTop:"1em"}}/>
          </div>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}

export default Crear;