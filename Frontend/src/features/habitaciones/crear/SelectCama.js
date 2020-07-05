import React from 'react';
import { InputWithoutLabel, Select } from "components/Input";    
import { Icon } from "components/Icon";    

const SelectCama = ({index, esMarinera, setEsMarinera, removeCama}) => {

  const IdentificadorUnaCama = ({index}) => {
                      return <div className="field">
                              <span className="control is-expanded">
                                <InputWithoutLabel name={`camasIndividuales[${index}].nombre`} placeholder="Identificador"/>
                              </span>
                            </div>
                         
  };

  const IdentificadorDosCamas = ({index}) => {
    return <>
            <span className="field">
                <InputWithoutLabel name={`camas[${index}].numeroAbajo`} placeholder="Id. Abajo"/>
              </span>
              <span className="field">
                <InputWithoutLabel name={`camas[${index}].numeroArriba`} placeholder="Id. Arriba"/>
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
    <div key={index} className="field field-body is-grouped">

        <div className="field is-expanded has-addons" style={{minWidth:"200px"}}>
          <span className="control">
            <span className="button is-static">
              Cama
            </span>
          </span>
          <span className="control is-expanded">
            <Select ccsClass="is-fullwidth" onChange={mostrarOcultarMarinera}>
              <option value="1">Individual</option>
              <option value="2">Matrimonial</option>
              <option value="3">Marinera</option>
            </Select>
          </span>
        </div>
        
        {!esMarinera ? 
          <IdentificadorUnaCama index={index}/> : 
          <IdentificadorDosCamas index={index} />
        }
        
        <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(index)}>
            <Icon faCode="trash-alt" />
        </button>

    </div>
  )
}

export default SelectCama;