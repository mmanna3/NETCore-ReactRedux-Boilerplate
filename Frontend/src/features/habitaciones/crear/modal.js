import React from 'react';
import Modal from '../../../components/Modal'

const Crear = ({esVisible, cerrar}) => {


  return (
    <Modal
        cerrar={() => cerrar()} 
        esVisible={esVisible}
        titulo="Crear habitación"
    >
        <p>sdasdsadss sdas dsa</p>
    </Modal> 
  )
}

export default Crear