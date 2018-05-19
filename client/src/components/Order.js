import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { postOrder } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

class Order extends Component {

    constructor(props){
        super(props)
        this.state = {
            make: '',
            model: '',
            package: '',
            id: ''
        }

        this.baseState = _.cloneDeep(this.state);
    }

    componentWillReceiveProps(newProps){
        let invalid_order = newProps.orders.filter( order => _.isNull(order.order_id))[0];

        if(invalid_order === undefined){
            // order saved to database

            this.setState(this.baseState)
            document.getElementById('order_flag').classList.add('show_success');
            setTimeout( () => {
                document.getElementById('order_flag').classList.remove('show_success')
            },3000);
        }else{
            // order is invalid

            let invalidFields = [];
            _.forIn(invalid_order, (val, key) => {
                if(val === false){
                    invalidFields.push(key);
                }
            })
            invalidFields.map( field => {
                document.getElementById(field).classList.add('invalid');
            })
        }
    }

    handleInputChange(event){
        this.setState({ [event.target.id]: event.target.value });
    }

    formIsComplete(){
        let emptyFields = [];

        _.forIn(this.state, (val, key) => {
            if(!val){
                emptyFields.push(key);
            }
        })

        if(emptyFields.length){
            emptyFields.map( field => {
                document.getElementById(field).classList.add('required');
            })
            return false
        }else{
            return true
        }
    }

    placeOrder(){
        if(this.formIsComplete()){

            this.props.postOrder( this.state );

            // this.setState(this.baseState)
        }
    }

    removeClass(field){
        document.getElementById(field).classList.remove('required', 'invalid');
    }

    render(){
        return (
            <div className='order padding-20'>    
                <header>
                    <Link to='/'> Home</Link>
                    <div id='order_flag' className='order_success'>Order Saved</div>
                </header>       
                <form onSubmit={() => this.placeOrder()}>
                    <h2>Place a new order</h2>

                    {
                        _.keysIn(this.state).map( field => {
                            return (
                                <div className='field' key={field}>
                                    <label htmlFor={field}>{_.capitalize(field)}</label>
                                    <input 
                                        onChange={ (event) => this.handleInputChange(event)} 
                                        value={this.state[field]} 
                                        id={field} 
                                        type="text" 
                                        onFocus={() => this.removeClass(field)}
                                    />
                                </div>
                            )
                        })
                    }

                    <button type='submit'>Place Order</button>

                </form>
                
            </div>
        )
    }
}

// check for invalid order ( order_id equals null )
function mapStateToProps({orders}){
    return { orders };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ postOrder }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);