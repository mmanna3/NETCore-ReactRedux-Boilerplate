import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel, ValidationSummary } from 'components/Modal';
import { Input, InputWithoutLabel, Select } from "components/Input";
import { crearHabitacion, cleanErrors, crearHabitacionSelector } from './slice';
import { useDispatch, useSelector } from 'react-redux'

const Crear = ({isVisible, onHide, onSuccessfulSubmit}) => {

  const {loading, validationErrors} = useSelector(crearHabitacionSelector)
  const [resetOnChanged, resetForm] = React.useState(0);
  
  const [camaIndexes, setCamaIndexes] = React.useState([]);
  const [esMarinera, setEsMarinera] = React.useState([]);
  const [counter, setCounter] = React.useState(1);

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
    setCamaIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
    configEsMarinera(counter, false);
  }

  function configEsMarinera(index, value){
    let newArr = [...esMarinera];
    newArr[index] = value;
    setEsMarinera(newArr);
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
        <button type="button" onClick={() => addCama()}>Agregar cama</button>
        {camaIndexes.map(index => <SelectCama key={`cama${index}`} index={index} esMarinera={esMarinera} setEsMarinera={configEsMarinera}/>)}
      </Body>
      <FooterAcceptCancel onCancel={hide} loading={loading} />
      
    </ModalForm> 
  )
}


const SelectCama = ({index, esMarinera, setEsMarinera}) => {

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
            {!esMarinera[index] ? <IdentificadorUnaCama index={index}/>: <IdentificadorDosCamas index={index} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Crear;