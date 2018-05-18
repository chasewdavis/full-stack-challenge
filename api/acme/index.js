const express = require('express');       

const app = express();

// in stock
let models = ['anvil','wile','roadrunner'];
let packages = ['std','super','elite'];

// ideally keys would be stored in database salted and hashed
let keys = ['cascade.53bce4f1dfa0fe8e7ca126f91b35d3a6'];

app.post('/acme/api/v45.1/order/:api_key/:model/:package', (req, res) => {
    
    const { api_key, model, package } = req.params;

    if(keys.includes(api_key)){
        let fakeOrderNumber = Math.floor(Math.random() * 10000)
        res.status(200).send({"order":fakeOrderNumber});
    }else{
        res.status(400)
    }

})

PORT = 3050;
app.listen( PORT, () => console.log(`ACME api is listening on port ${PORT}`));