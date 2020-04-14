import filtersReducer from '../../reducers/filters';
import momemt from 'moment';
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type : '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: momemt().startOf('month'),
        endDate : momemt().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined,{type : "SORT_BY_AMOUNT"});
    expect(state.sortBy).toEqual('amount')
})

test('should set sortBy to date', () => {
    const currentState = {
        text : '',
        startDate : undefined,
        endDate: undefined,
        sortBy : 'amount'
    }
    const action = { type : 'SORT_BY_DATE'};
    const state = filtersReducer(currentState,action);
    expect(state.sortBy).toEqual('date')
})

test('should set text value', () => {
    const text = 'rent';
    const action = { type : "SET_TEXT_FILTER",text};
    const state = filtersReducer(undefined,action);
    expect(state.text).toEqual('rent');
})

test('should set startDate', () => {
    const startDate = momemt();
    const action = {
        type : "SET_START_DATE",
        startDate
    }
    const state = filtersReducer(undefined,action);
    expect(state.startDate).toEqual(startDate);
});

test('should set endDate', () => {
    const endDate = momemt();
    const action = {
        type : "SET_END_DATE",
        endDate
    }
    const state = filtersReducer(undefined,action);
    expect(state.endDate).toEqual(endDate);
});