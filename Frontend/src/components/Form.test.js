import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount, render, shallow, configure } from 'enzyme';
import Form from './Form';
import {Input, Select} from './Input';
import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

configure({ adapter: new Adapter() });

it('un sólo tag input adentro, le pone el name', () => {
  const jsx = (
    <Form name="prueba">
      <Input label="Nombre" name="nombre" />
    </Form>
)
  
  const wrapper = mount(jsx);
    
  var input = wrapper.find(Input).find('input[name="nombre"]');
  
  var innerInput = input.getDOMNode();  
  var a = Object.keys(innerInput).find(key=>key.startsWith("__reactInternalInstance$"))  
  var instance = innerInput[a];
  
  console.log(instance.ref);  
  console.log(instance.pendingProps.name)

  var name = wrapper.find(Input).find('input[name="nombre"]').prop('name');
  expect(name).toBe('nombre');

});