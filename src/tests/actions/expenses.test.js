import { startAddExpense,addExpense, editExpense, removeExpense}  from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
const createMockStore = configureMockStore([thunk]);
test('should setup remove expense', () => {
    const action = removeExpense({id : '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
});

test('should setup edit expense action object', () => {
const action =editExpense('123abc', {notes:'qwee'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: "123abc",
        updates : {
            notes : 'qwee'
        } 
    })
})

test('should setup add expense action object with provided value', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense : expenses[2]
    })
})

test('should add expense to database and store',(done) => {
    const store = createMockStore({});
    const expenseData = {
        description : 'tanish',
        amount : 3000,
        note : 'this is sn',
        createdAt :333
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
              id: expect.any(String),
              ...expenseData
            }
          });
       return database.ref(`expenses/${actions[0].expense.id}`).once('value').then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        })
        
    });
});
test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
  
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseDefaults
        }
      });
  
      return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
  });
// test('should setup add expense action object with default value', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense : {
//             id: expect.any(String),
//             description : '',
//             note : '',
//             amount : 0,
//             createdAt : 0
//         }
//     })
// })