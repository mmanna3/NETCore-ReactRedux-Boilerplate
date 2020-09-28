import React from 'react';   
import Select from "components/Select";    
import { Icon } from "components/Icon";    

const SelectCama = ({cama, habitaciones, cargando, onHabitacionChange, eliminar}) => {

  return (
    <div className="field field-body is-grouped">

      <div className="field field-body is-grouped">
        <div className="field is-expanded has-addons" style={{minWidth:"200px"}}>
          <span className="control">
            <span className="button is-static">
              Hab.
            </span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
              <Select style={{minWidth:"180px"}} onChange={onHabitacionChange}>
              {cargando ?
              <option>Cargando...</option> :
              habitaciones.map((habitacion, index) => {
                return <option key={habitacion.id} value={index}>{habitacion.nombre} ({habitacion.cantidadDeLugaresLibres})</option>
              })
              }
              </Select>
            </span>
          </span>
        </div>

        <div className="field is-expanded has-addons" style={{minWidth:"280px"}}>
          <span className="control">
            <span className="button is-static">
              Cama
            </span>
          </span>
          <span className="control is-expanded">
            <span className="control is-expanded">
            <Select name={`CamasIds[${cama.indice}]`} style={{minWidth:"220px"}}>
              {cama.camasDisponibles.length === 0 ?
                <option>No tiene</option> :
                cama.camasDisponibles.map((cama) => {
                  return <option key={cama.id} value={cama.id}>{cama.tipo} - {cama.nombre}</option>
                })
              }
            </Select>
            </span>
          </span>
        </div>
      </div>

      <button className="button has-text-grey has-background-light" type="button" onClick={() => eliminar(cama.indiceGlobal)}>
        <Icon faCode="trash-alt" />
      </button>

    </div>
  )
}

export default SelectCama;