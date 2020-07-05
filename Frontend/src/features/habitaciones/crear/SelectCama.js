import React from 'react';
import { InputWithoutLabel, Select } from "components/Input";    
import { Icon } from "components/Icon";    

const SelectCama = ({index, esMarinera, setEsMarinera, removeCama}) => {

  const IdentificadorUnaCama = ({index}) => {
                      return <>
                      <div className="field">
                            <span className="control is-expanded">
                              <InputWithoutLabel name={`camas[${index}].numero`}/>
                            </span>
                            </div>
                         </>
  };

  const IdentificadorDosCamas = ({index}) => {
    return <>
            <span className="field">
                <InputWithoutLabel name={`camas[${index}].numeroAbajo`}/>
              </span>
              <span className="field">
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
    <div key={index} className="field is-grouped">
      <div className="field-body">
        <div className="field is-expanded">
          <div className="field has-addons">
            <span className="control">
              <span className="button is-static">
                Cama
              </span>
            </span>
            <span className="control is-expanded">
              <Select ccsClass="is-fullwidth" name={`camas[${index}].tipo`} onChange={mostrarOcultarMarinera}>
                <option value="1">Individual</option>
                <option value="2">Matrimonial</option>
                <option value="3">Marinera</option>
              </Select>
            </span>
          </div>
        </div>
        
        {!esMarinera ? 
              <IdentificadorUnaCama index={index}/> : 
              <IdentificadorDosCamas index={index} />
            }
        
        <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(index)}>
            <Icon faCode="trash-alt" />
        </button>
      </div>
    </div>
  )
}

export default SelectCama;