import React from 'react';
import { InputWithoutLabel, Select } from "components/Input";    
import { Icon } from "components/Icon";    

const SelectCama = ({index, tipo, setTipoCama, removeCama}) => {

  const IdentificadorIndividualOMatrimonial = ({index, tipo}) => {
                      return <div className="field">
                              <span className="control is-expanded">
                                <InputWithoutLabel name={`camas${tipo}[${index}].nombre`} placeholder="Identificador"/>
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
    setTipoCama(index, tipo, e.target.value);
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
        
        {tipo !== 'Marineras' ? 
          <IdentificadorIndividualOMatrimonial index={index} tipo={tipo} /> : 
          <IdentificadorCamaMarinera index={index} />
        }
        
        <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(index)}>
            <Icon faCode="trash-alt" />
        </button>

    </div>
  )
}

export default SelectCama;