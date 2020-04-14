import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExpenseDashBoard from '../../components/ExpenseDashboardPage';

test('should render ExpenseDashBoard correctly' , () => {
    const wrapper = shallow(<ExpenseDashBoard />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});