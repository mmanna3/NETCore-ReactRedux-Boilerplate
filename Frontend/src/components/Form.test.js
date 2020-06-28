import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount, render, shallow, configure } from 'enzyme';
import Form from './Form';
import {Input} from './Input';
import 'mutationobserver-shim';
global.MutationObserver = window.MutationObserver;

configure({ adapter: new Adapter() });

it('un sólo tag input adentro, le pone el name', () => {
  const jsx = (
    <Form name="prueba">
      <Input label="Nombre" name="nombre" />
    </Form>
)
  
  const wrapper = shallow(jsx);
  
  console.log(wrapper);
  var name = wrapper.find(Input).prop('name');
  console.log(wrapper.find(Input).dive().find('input[name="nombre"]').prop('name'));

  expect(name).toBe('nombre');
  
  

  // console.log(wrapper.props())
  // console.log(wrapper.props().children)
  // console.log(wrapper.props().children.type)
  // expect(wrapper.props().name).to.equal('prueba');
  
  //wrapper.setProps({ bar: 'foo' });
  //expect(wrapper.props().bar).to.equal('foo');
});