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
  
  const jsx = (
    <Form>
      <Input name={A_NAME} />
    </Form>
  );
  
  const wrapper = mount(jsx);
    
  AssertInputExistsAndHasValidRegisterProp(wrapper);
});

it('Supports nested Input Component (HTML tree)', () => {

  const jsx = (
    <Form>
      <div>
        <div>
          <Input name={A_NAME} />
        </div>
      </div>      
    </Form>
  );
  
  const wrapper = mount(jsx);
    
  AssertInputExistsAndHasValidRegisterProp(wrapper);
});

it('Supports nested Input Component (Component tree)', () => {
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <Input name={A_NAME} />
        </Body>
      </Modal>      
    </Form>
  );
  
  const wrapper = mount(jsx);
    
  AssertInputExistsAndHasValidRegisterProp(wrapper); 
});

it('Supports nested Select Component (Component tree)', () => {
  
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
  );
  
  const wrapper = mount(jsx);

  AssertSelectExistsAndHasValidRegisterProp(wrapper);
});


it('Supports nested Wrapped Select Component (Component tree)', () => {
  
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
  );
  
  const wrapper = mount(jsx);

  AssertSelectExistsAndHasValidRegisterProp(wrapper);
});

it('Supports null result of Wrapped Component (Component tree)', () => {
  
  const SelectCama = () => {
    return null;       
  }  
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          <SelectCama />
        </Body>
      </Modal>      
    </Form>
  );
  
  mount(jsx);
});

it('Supports nested Array of Input Component (Component tree)', () => {
  
  var array = [1,2,3];
  
  const jsx = (
    <Form>
      <Modal>
        <Body>
          {array.map((index) => 
            <Input key={index} name={index} />
          )}          
        </Body>
      </Modal>
    </Form>
  );
  
  const wrapper = mount(jsx);
    
  var inputs = wrapper.find(Input);

  expect(inputs.getElements().length).toBe(3);
  
  inputs.forEach((input) => {
    expect(input.prop('name')).not.toBe('');
    expect(typeof input.prop('register')).toBe('function');
  });
  
});

function AssertSelectExistsAndHasValidRegisterProp(wrapper) {
  var select = wrapper.find(Select);
  expect(select.prop('name')).not.toBe('');
  expect(typeof select.prop('register')).toBe('function');
}

function AssertInputExistsAndHasValidRegisterProp(wrapper) {
  var input = wrapper.find(Input);
  expect(input.prop('name')).not.toBe('');
  expect(typeof input.prop('register')).toBe('function');
}

/*TODO:
  Add "Support adding element to array of component" case
  Add "Support removing element to array of component" case
*/