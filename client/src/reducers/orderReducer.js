import { POST_NEW_ORDER, GET_ALL_ORDERS } from '../actions/index';
import _ from 'lodash';

export default function(state = [], action){

    switch(action.type){
        case POST_NEW_ORDER:
            
            // keep only one invalid order on state (potentially action.payload.data) ( doing this to help user with form )
            let newState = _.cloneDeep(state).filter( order => !_.isNull(order.order_id) );

            return [ action.payload.data, ...newState ];

        case GET_ALL_ORDERS:
            return action.payload.data;
        default:
            return state;
    }

}