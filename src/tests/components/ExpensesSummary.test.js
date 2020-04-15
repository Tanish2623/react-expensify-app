import React from 'react';
import {shallow} from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render ExpenseSumaary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={235}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should correctly render ExpenseSumaary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expenseTotal={23588}/>);
    expect(wrapper).toMatchSnapshot();
})