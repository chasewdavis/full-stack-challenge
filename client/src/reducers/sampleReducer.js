// This is here for reference and can be removed
import { ERROR, LOADING, SUCCESS, NOT_STARTED } from './statusTypes';
import { SAMPLE_GET_PENDING, SAMPLE_GET_RESOLVED, SAMPLE_GET_REJECTED } from '../actions/sampleActions';

const initialState = {
    data: [],
    status: NOT_STARTED,
    error: {}
};

const sampleReducer = function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SAMPLE_GET_PENDING: {
            return { ...state, status: LOADING };
        }

        case SAMPLE_GET_RESOLVED: {
            return { ...state, data: payload, status: SUCCESS };
        }

        case SAMPLE_GET_REJECTED: {
            return { ...state, error: payload, status: ERROR };
        }

        default: {
            return state;
        }
    }
};

export default sampleReducer;
