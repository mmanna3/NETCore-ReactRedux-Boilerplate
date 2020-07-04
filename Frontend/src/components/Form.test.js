import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme';
import Form from './Form';
import {Input, Select} from './Input';
import 'mutationobserver-shim';
import { Modal, Body } from './Modal';

global.MutationObserver = window.MutationObserver;
configure({ adapter: new Adapter() });  //Necesario para hacer mount con componentes multinivel

it('Being only child, ReactComponent has NAME prop, so add REGISTER prop', () => {
  
  var name = 'nombre';
  
  const jsx = (
    <Form>
      <Input name={name} />
    </Form>
  )
  
  const wrapper = mount(jsx);
    
  var inputComponent = wrapper.find(Input);

  expect(inputComponent.prop('name')).toBe(name);
  expect(typeof inputComponent.prop('register')).toBe('function');  
});

it('In multiLevel html simple elements tree, InputComponent has NAME prop, so add REGISTER prop', () => {
  
  var name = 'nombre';
  
  const jsx = (
    <Form>
      <div>
        <div>
          <Input name={name} />
        </div>
      </div>      
    </Form>
  )
  
  const wrapper = mount(jsx);
    
  var inputComponent = wrapper.find(Input);
  
  expect(inputComponent.prop('name')).toBe(name);
  expect(typeof inputComponent.prop('register')).toBe('function');  
});

it('In multiLevel reactComponents tree, InputComponent has NAME prop, so add REGISTER prop', () => {
  
  var name = 'nombre';
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <Input name={name} />
        </Body>
      </Modal>      
    </Form>
  )
  
  const wrapper = mount(jsx);
    
  var inputComponent = wrapper.find(Input);
  
  expect(inputComponent.prop('name')).toBe(name);
  expect(typeof inputComponent.prop('register')).toBe('function');  
});

it('In multiLevel reactComponents tree, SelectComponent has NAME prop, so add REGISTER prop', () => {
  
  var name = 'nombre';
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <Select name={name}>
            <option>1</option>
          </Select>
        </Body>
      </Modal>      
    </Form>
  )
  
  const wrapper = mount(jsx);

  var selectComponent = wrapper.find(Select);
  
  expect(selectComponent.prop('name')).toBe(name);
  expect(typeof selectComponent.prop('register')).toBe('function');
});


it('In multiLevel reactComponents tree, SelectComponent is wrapped in another Component and has NAME prop, so add REGISTER prop', () => {
  
  var name = 'nombre';

  const SelectCama = () => {
    return <div>
            <Select name={name}>
              <option value="1">Individual</option>
              <option value="2">Matrimonial</option>
              <option value="3">Marinera</option>
            </Select>
          </div>;       
  }  
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <SelectCama />
        </Body>
      </Modal>      
    </Form>
  )
  
  const wrapper = mount(jsx);

  var selectComponent = wrapper.find(Select);
  
  expect(selectComponent.prop('name')).toBe(name);
  expect(typeof selectComponent.prop('register')).toBe('function');
});

/*TODO:
  All tests should be renamed as "supports ..."
  Add "Support null component" case
  Add "Support array component" case
  Add "Support dynamic array component" case
  Change all "multilevel" concept for "nested" concept
*/