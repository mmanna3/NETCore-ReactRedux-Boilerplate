import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { mount, configure } from 'enzyme';
import Form from './Form';
import {Input, Select} from './Input';
import 'mutationobserver-shim';
import { Modal, Body } from './Modal';

global.MutationObserver = window.MutationObserver;
configure({ adapter: new Adapter() });  //Needed to mount nested components

const A_NAME = 'someName';

/*All tests will check Components with "Name" prop have a function in the register attribute*/

it('Supports Input Component', () => {
  
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

it('Supports nested Input Component (in HTML tree)', () => {
  
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

it('Supports nested Input Component (in Component tree)', () => {
  
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

it('Supports nested Select Component (in Component tree)', () => {
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <Select name={A_NAME}>
            <option>1</option>
          </Select>
        </Body>
      </Modal>      
    </Form>
  )
  
  const wrapper = mount(jsx);

  AssertSelectExistsAndHasValidRegisterProp(wrapper);
});


it('Supports nested Wrapped Select Component (in Component tree)', () => {
  
  const SelectCama = () => {
    return <div>
            <Select name={A_NAME}>
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

  AssertSelectExistsAndHasValidRegisterProp(wrapper);
});

function AssertSelectExistsAndHasValidRegisterProp(wrapper){
  var select = wrapper.find(Select);
  expect(select.prop('name')).not.toBe('');
  expect(typeof select.prop('register')).toBe('function');
}

/*TODO:
  Add "Support null component" case
  Add "Support array component" case
  Add "Support adding element to array of component" case
  Add "Support removing element to array of component" case
*/