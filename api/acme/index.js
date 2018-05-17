const express = require('express');       

const app = express();

// in stock
let models = ['anvil','wile','roadrunner'];
let packages = ['std','super','elite'];

app.post('/acme/api/v45.1/order/:api_key/:model/:package', (req, res) => {
    
    const { api_key, model, package } = req.params;

    console.log('params from acme', req.params);

    res.status(200).send('response yo')
})

PORT = 3050;
app.listen( PORT, () => console.log(`ACME api is listening on port ${PORT}`));