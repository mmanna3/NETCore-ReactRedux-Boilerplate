import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { shallow, configure } from 'enzyme';
import Table from './Table'

configure({ adapter: new Adapter() });

describe('Calendar Table', () => {

    describe('Thead', () => {

        it('has two rows', () => {    
            const wrapper = shallow(<Table />);
            const thead = wrapper.find('thead');
            const rows = thead.find('tr');
            expect(rows).toHaveLength(2);
        })
    })
})