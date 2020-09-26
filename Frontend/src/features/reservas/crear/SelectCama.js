import React from 'react';
import { InputWithoutLabel } from "components/Input";    
import Select from "components/Select";    
import { Icon } from "components/Icon";    

const SelectCama = ({habitaciones, cargando, camasDisponibles, onHabitacionChange}) => {

  // const IdentificadorIndividualOMatrimonial = ({cama, setValue}) => {

  //   return <div className="field">
  //           <span className="control is-expanded">
  //             <InputWithoutLabel 
  //                         name={`camas${cama.tipo}[${cama.index}].nombre`} 
  //                         placeholder="Identificador"
  //                         onChange={e => setValue(cama.globalIndex, {nombre: e.target.value})}
  //                         value={cama.value?.nombre}/>
  //           </span>
  //         </div>
  // };

  // const IdentificadorCamaCucheta = ({cama}) => {
    
  //   function setValueCucheta(){
  //     var abajo = document.getElementsByName(`camasCuchetas[${cama.index}].abajo.nombre`)[0].value;
  //     var arriba = document.getElementsByName(`camasCuchetas[${cama.index}].arriba.nombre`)[0].value;

  //     setValue(cama.globalIndex, {abajo: {nombre: abajo}, arriba: {nombre: arriba}});
  //   }
    
  //   return <>
  //           <span className="field">
  //               <InputWithoutLabel 
  //                 name={`camasCuchetas[${cama.index}].abajo.nombre`} 
  //                 placeholder="Id. Abajo"
  //                 onChange={() => setValueCucheta()}
  //                 value={cama.value?.abajo?.nombre}
  //                 />
  //             </span>
  //             <span className="field">
  //               <InputWithoutLabel 
  //                 name={`camasCuchetas[${cama.index}].arriba.nombre`} 
  //                 placeholder="Id. Arriba"
  //                 onChange={() => setValueCucheta()}
  //                 value={cama.value?.arriba?.nombre}
  //               />
  //             </span>
  //         </>
  // };  

  // const onTipoCamaChanged = (e) => {
  //   setTipoCama(cama.index, cama.tipo, e.target.value);
  // }

  return (
    <div>
        <Select name="Habitacion" onChange={onHabitacionChange}>
          {cargando ?
            <option>Cargando habitación..</option> :
            habitaciones.map((habitacion, index) => {
              return <option key={habitacion.Id} value={index}>{habitacion.nombre} ({habitacion.cantidadDeLugaresLibres} lugares)</option>
            })
          }
        </Select>
        <Select name="CamasIds[0]">
          {camasDisponibles.length === 0 ?
            <option>No hay camas disponibles</option> :
            camasDisponibles.map((cama) => {
              return <option key={cama.id} value={cama.id}>{cama.tipo} - {cama.nombre}</option>
            })
          }
        </Select>
    </div>
    // <div className="field field-body is-grouped">

    //     <div className="field is-expanded has-addons" style={{minWidth:"200px"}}>
    //       <span className="control">
    //         <span className="button is-static">
    //           Cama
    //         </span>
    //       </span>
    //       <span className="control is-expanded">
    //         <Select value={cama.tipo || ''} ccsClass="is-fullwidth" onChange={onTipoCamaChanged}>
    //           <option value="Individuales">Individual</option>
    //           <option value="Matrimoniales">Matrimonial</option>
    //           <option value="Cuchetas">Cucheta</option>
    //         </Select>
    //       </span>
    //     </div>
        
    //     {cama.tipo !== 'Cuchetas' ?
    //       <IdentificadorIndividualOMatrimonial cama={cama} setValue={setValue} /> :
    //       <IdentificadorCamaCucheta cama={cama} setValue={setValue}/>
    //     }
        
    //     <button className="button has-text-grey has-background-light" type="button" onClick={removeCama(cama.globalIndex)}>
    //         <Icon faCode="trash-alt" />
    //     </button>

    // </div>
  )
}

export default SelectCama;