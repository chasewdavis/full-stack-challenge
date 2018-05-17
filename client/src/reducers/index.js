import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    sample: sampleReducer,
    orders: orderReducer
});

export default rootReducer;
