import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {
    render() {

        // console.log('orders are:', this.props.orders)

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

export default connect(mapStateToProps)(Home);
