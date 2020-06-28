import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme';
import Form from './Form';
import {Input, Select} from './Input';
import 'mutationobserver-shim';

global.MutationObserver = window.MutationObserver;
configure({ adapter: new Adapter() });  //Necesario para hacer mount con componentes multinivel

it('inputHtmlTag inside InputComponent has NAME and REGISTER props', () => {
  
  var name = 'nombre';
  
  const jsx = (
    <Form name="prueba">
      <Input label="Nombre" name={name} />
    </Form>
  )
  
  const wrapper = mount(jsx);
    
  var customInputComponent = wrapper.find(Input);
  var htmlInputTag = customInputComponent.find('input');
  
  expect(typeof customInputComponent.prop('register')).toBe('function');
  expect(typeof htmlInputTag.prop('register')).toBe('undefined');
  expect(htmlInputTag.prop('name')).toBe(name);
});