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
                    <Link to='/order'>Make Orders</Link>
                </header> 

                <table>
                    <tbody>
                        
                    <tr>
                        <th>Order ID</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Package</th>
                        <th>Customer ID</th>
                        <th>Download</th>
                    </tr>
                    {this.props.orders.map( order => {
                        return (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.make}</td>
                                <td>{order.model}</td>
                                <td>{order.package}</td>
                                <td>{order.customer_id}</td>
                                <td><a href={`http://localhost:3030/orderJSON/${order.order_id}`}>Download</a></td>
                            </tr>
                        )
                    })}

                    </tbody>

                </table>
                
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
