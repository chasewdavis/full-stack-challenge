import axios from 'axios';
import { postOrderCall } from '../data/data';

export const POST_NEW_ORDER = 'POST_NEW_ORDER';

export function postOrder(order){

    const request = postOrderCall(order);  // promise can be easily tested in this format

    console.log('request from action: ', request)

    return {
        type: POST_NEW_ORDER,
        payload: request
    }
}