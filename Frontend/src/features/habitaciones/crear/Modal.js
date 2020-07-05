import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, InputWithoutLabel, Select } from "components/Input";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

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

  function configEsMarinera(index, value) {
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
                      setEsMarinera={configEsMarinera} 
                      removeCama={removeCama}/>)}
          <button type="button" onClick={() => addCama()}>Agregar cama</button>
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}


const SelectCama = ({index, esMarinera, setEsMarinera, removeCama}) => {

  const IdentificadorUnaCama = ({index}) => {
                      return <>
                        <span className="control">
                        <span className="button is-static">
                          Nº
                        </span>
                      </span>
                      <span className="control is-expanded">
                        <InputWithoutLabel name={`camas[${index}].numero`}/>
                      </span>
                    </>
  };

  const IdentificadorDosCamas = ({index}) => {
    return <>
            <span className="control">
            <span className="button is-static">
              Nº Abajo
            </span>
            </span>
            <span className="control is-expanded">
              <InputWithoutLabel name={`camas[${index}].numeroAbajo`}/>
            </span>
            <span className="control">
              <span className="button is-static">
                Nº Arriba
              </span>
            </span>
            <span className="control is-expanded">
              <InputWithoutLabel name={`camas[${index}].numeroArriba`}/>
            </span>
          </>
  };  

  const mostrarOcultarMarinera = (e) => {
    if (e.target.value === "3") 
      setEsMarinera(index, true);
    else
      setEsMarinera(index, false);
  }

  return (
    <div key={index} className="field is-horizontal">
      <div className="field-body">
        <div className="field is-expanded">
          <div className="field has-addons">
            <span className="control">
              <span className="button is-static">
                Cama
              </span>
            </span>
            <span className="control">
              <Select name={`camas[${index}].tipo`} onChange={mostrarOcultarMarinera}>
                <option value="1">Individual</option>
                <option value="2">Matrimonial</option>
                <option value="3">Marinera</option>
              </Select>
            </span>
            {!esMarinera ? <IdentificadorUnaCama index={index}/>: <IdentificadorDosCamas index={index} />
            }
          </div>
        </div>
        <button type="button" onClick={removeCama(index)}>
              Remove
        </button>
      </div>
    </div>
  )
}

export default Crear;