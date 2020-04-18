import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selector/expenses';
import selectExpensesTotal from '../selector/expenses-total';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? 'expense': 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal/100).format('$0,0.00');
    return(
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                <div className="page-header__actions"> 
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
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