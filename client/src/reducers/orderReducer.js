import { POST_NEW_ORDER } from '../actions/index';

export default function(state = [], action){

    console.log('action from reducer', action);

    switch(action.type){
        case POST_NEW_ORDER: 
            return [ action.payload.data, ...state ];
        default:
            return state;
    }

}