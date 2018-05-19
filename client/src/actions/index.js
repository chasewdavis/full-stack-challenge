import axios from 'axios';
import { postOrderCall, getOrdersCall } from '../data/data';

export const POST_NEW_ORDER = 'POST_NEW_ORDER';
export const GET_ALL_ORDERS = 'GET_ALL_ORDERS';

export function postOrder(order){

    const request = postOrderCall(order);  // promise can be easily tested in this format

    console.log('request from action: ', request)

    return {
        type: POST_NEW_ORDER,
        payload: request
    }
}

export function getOrders(){

    console.log('get orders fired')

    const request = getOrdersCall();

    return{
        type: GET_ALL_ORDERS,
        payload: request
    }
}