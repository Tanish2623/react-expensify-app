import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selector/expenses';
import selectExpensesTotal from '../selector/expenses-total';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense': 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');
    return(
        <div>
            <h1>Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}</h1>
        </div>
    );
}

const mapStateToprops = (state) => {
    const visibleExpense = selectExpenses(state.expenses,state.filters);

    return{
        expenseCount  : visibleExpense.length,
        expensesTotal : selectExpensesTotal(visibleExpense)
    }
};

export default connect(mapStateToprops)(ExpensesSummary);