import React from 'react';
import { InputWithoutLabel, Select } from "components/Input";    
import { Icon } from "components/Icon";    

const SelectCama = ({cama, setTipoCama, removeCama, setValue}) => {

  const IdentificadorIndividualOMatrimonial = ({cama, setValue}) => {        
    
    return <div className="field">
            <span className="control is-expanded">
              <InputWithoutLabel 
                          name={`camas${cama.tipo}[${cama.index}].nombre`} 
                          placeholder="Identificador"
                          onChange={e => setValue(cama.globalIndex, e.target.value)}
                          value={cama.value}/>
            </span>
          </div>
                         
  };

  const IdentificadorCamaMarinera = ({index}) => {
    return <>
            <span className="field">
                <InputWithoutLabel name={`camasMarineras[${index}].nombreAbajo`} placeholder="Id. Abajo"/>
              </span>
              <span className="field">
                <InputWithoutLabel name={`camasMarineras[${index}].nombreArriba`} placeholder="Id. Arriba"/>
              </span>
          </>
  };  

  const onTipoCamaChanged = (e) => {
    debugger;
    setTipoCama(cama.index, cama.tipo, e.target.value);
  }

  return (
    <div className="field field-body is-grouped">

        <div className="field is-expanded has-addons" style={{minWidth:"200px"}}>
          <span className="control">
            <span className="button is-static">
              Cama
            </span>
          </span>
          <span className="control is-expanded">
            <Select ccsClass="is-fullwidth" onChange={onTipoCamaChanged}>
              <option value="Individuales">Individual</option>
              <option value="Matrimoniales">Matrimonial</option>
              <option value="Marineras">Marinera</option>
            </Select>
          </span>
        </div>
        
        {cama.tipo !== 'Marineras' ? 
          <IdentificadorIndividualOMatrimonial cama={cama} setValue={setValue} /> :
          <IdentificadorCamaMarinera index={cama.index} />
        }
        
        <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(cama.globalIndex)}>
            <Icon faCode="trash-alt" />
        </button>

    </div>
  )
}

export default SelectCama;