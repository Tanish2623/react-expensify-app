
// const selectExpensesTotal = (expenses) => {
//     let total=0;
//     expenses.map((expense) =>{
//         total +=expense.amount;
//     })
//     return total;
// }

const selectExpensesTotal = (expenses) => {
    return expenses
        .map((expense) => expense.amount)
        .reduce((sum, value) => {
            return sum+value;
        },0);
}
export default selectExpensesTotal;