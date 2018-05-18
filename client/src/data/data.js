const axios = require('axios');

module.exports = {
    postOrderCall(order){
        return axios.post(`http://localhost:3030/order/${order.make}/${order.model}/${order.package}/${order.id}`)
    }
}