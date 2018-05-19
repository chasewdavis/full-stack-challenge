const express = require('express');
const app = express();

const fakeToken = "ff6bfd673ab6ae03d8911";

app.get('/rainier/v10.0/nonce_token/:storefront', (req, res) => {
    res.status(200).send({nonce_token: fakeToken})
})

app.post('/rainier/v10.0/request_customized_model/:token/:model/:package', (req, res) => {
    let fakeOrderNumber = Math.floor(Math.random() * 10000);
    res.status(200).send({order_id:`${fakeOrderNumber}`})
})



PORT = 3051;
app.listen( PORT, () => console.log(`RAINER api is listening on port ${PORT}`));