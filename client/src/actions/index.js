import axios from 'axios';

export const POST_NEW_ORDER = 'POST_NEW_ORDER';

export function postOrder(order){
    const request = axios.post(`http://localhost:3030/order/${order.make}/${order.model}/${order.package}/${order.id}`);
    
    console.log('request from action: ', request)

    return {
        type: POST_NEW_ORDER,
        payload: request
    }
}