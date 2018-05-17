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

            this.setState(this.baseState)
        }
    }

    removeClass(field){
        document.getElementById(field).classList.remove('required');
    }

    render(){
        return (
            <div className='order padding-20'>    
                <header>
                    <Link to='/'> Home</Link>
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

function mapDispatchToProps(dispatch){
    return bindActionCreators({ postOrder },dispatch)
}

export default connect(null, mapDispatchToProps)(Order);