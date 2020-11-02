import React from 'react';
import { ModalForm, Body, Header, FooterAcceptCancel } from 'components/Modal';
import { Input } from "components/Input";

const Detalle = ({isVisible, onHide, id}) => {

  return (
    <ModalForm
        isVisible={isVisible}
        onHide={onHide}
    >
      <Header title="Detalle de habitación" onHide={onHide} />
      <Body>
        <Input label="Id" defaultValue={id} />        
      </Body>
      <FooterAcceptCancel onCancel={onHide} />
      
    </ModalForm> 
  )
}

export default Detalle;