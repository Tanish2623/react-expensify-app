import React from 'react';
import moment from 'moment';
import { SingleDatePicker} from 'react-dates';


class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            description: props.expense ? props.expense.description : '',
            notes : props.expense ? props.expense.notes : '',
            amount : props.expense ? (props.expense.amount /100).toString() : '',
            createdAt : props.expense ? moment(props.expense.createdAt): moment(),
            calenderFocused : false,
            error : ''
        };
    }
    
    onDescriptionChange = (e) =>{
        const description = e.target.value;
        this.setState(() => ({description}));
    }
    onTextAreaChange = (e) => {
        const notes = e.target.value;
        this.setState(() => ({notes}));
    }
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({amount}))
        } 
    };
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() => ({createdAt}));
        }
    };
    onFocusChange = ({ focused }) => {
        this.setState(() => ({calenderFocused : focused}))
    };
    onSubmit = (e)=>{
        e.preventDefault();

        if(!this.state.description || !this.state.amount){
            this.setState(() => ({error : 'please provide description and ammount.'}));
            // Set error state to 'please provide description'
        }else{
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description:this.state.description,
                amount : parseFloat(this.state.amount)*100,
                createdAt : this.state.createdAt.valueOf(),
                notes : this.state.notes
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error  && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input 
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                        autoFocus
                    />
                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths = {1}
                        isOutsideRange= {() => false}
                    />
                    <textarea
                        placeholder= "add a note on expense"
                        value={this.state.notes}
                        onChange={this.onTextAreaChange}
                    >
                    </textarea>
                    <button>Add expense</button>
                </form>
            </div>
        );
    }
}

export default ExpenseForm;