import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getOrders } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Home extends Component {
    
    componentDidMount(){
        this.props.getOrders();
    }

    render() {

        return (
            <div className="home padding-20">
                <header>
                    <Link to='/order'>Order</Link>
                </header> 

                <ul>
                    {
                        this.props.orders.map( (order, i) => {
                            return (
                                <li key={i}>
                                    {order.make}
                                </li>
                            )
                        })
                    }
                </ul>
                
            </div>
        );
    }
}

function mapStateToProps({ orders }){
    return { orders }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getOrders }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
