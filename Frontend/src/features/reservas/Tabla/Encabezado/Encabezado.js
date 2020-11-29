import React from 'react';
import Estilos from './Encabezado.module.scss'
import { Icon } from "components/Icon";

const Encabezado = ({habitaciones, mostrarDetalle}) => {

  var iconosCamas = {
    Individual: 'individual',
    Matrimimonial: 'matrimonial',
    'Cucheta Abajo': 'cucheta-abajo',
    'Cucheta Arriba': 'cucheta-arriba',    
  }

  var estilosIconoCama = {
    Individual: 'iconoCamaIndividual',
    Matrimimonial: 'iconoCamaMatrimonial',
    'Cucheta Abajo': 'iconoCamaCucheta',
    'Cucheta Arriba': 'iconoCamaCucheta',    
  }

  return (
        <thead className="is-bordered">
          <tr>
            <th rowSpan="2" className={Estilos.interseccion}></th>
            {habitaciones.map((habitacion, i) => 
              <th key={i} className={`has-text-weight-medium ${Estilos.habitacion}`} colSpan={habitacion.camas.length}>
                Habitación {habitacion.nombre} {habitacion.esPrivada ? '\uf023' : ''}
                <button type="button"
                        className={`button is-primary is-inverted is-small ${Estilos.iconoInfo}`}
                        onClick={() => mostrarDetalle(habitacion.id)}>

                  <Icon faCode="info-circle" size="2x" />
                </button>
              </th>
            )}
          </tr>        
          <tr>
            {habitaciones.map((habitacion) => 
              habitacion.camas.map((cama,i) =>
                <th key={i} className={`has-text-weight-medium ${Estilos.cama}`}>
                  <div>                    
                      <img className={Estilos[`${estilosIconoCama[cama.tipo]}`]} src={`images/icons/camas/${iconosCamas[cama.tipo]}.svg`} alt="a" style={{width:'30px !important'}}/>                    
                    {/* {cama.nombre} */}
                  </div>
                </th>
              )
            )}
          </tr>
        </thead>
  )
}

export default Encabezado;