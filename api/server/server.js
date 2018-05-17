require('dotenv').config();

const express = require('express'),
      request = require('superagent');

// normally should include .env inside .gitignore
const ACME_API_KEY = process.env.ACME_API_KEY;  

const app = express();

app.post('/order/:make/:model/:package/:customer_id', (req,res) => {

    const { make, model, package, customer_id } = req.params

    console.log('make', make);
    console.log('model', model);
    console.log('package', package);
    console.log('customer_id', customer_id);

    // what acme has available
    let models = ['anvil','wile','roadrunner'];
    let packages = ['std','super','elite'];

    let model_available;
    let package_available;

    if(make === 'acme'){
        if(models.includes(model)){
            model_available = true;
        }
        if(packages.includes(package)){
            package_available = true;
        }
        if(model_available && package_available){

            console.log('both available, making request');

            request.post(`http://localhost:3050/acme/api/v45.1/order/${ACME_API_KEY}/${model}/${package}`)
                .end( (err, res) => {
                        // console.log('err: ', err);
                        console.log('res: ', res.data);
                }) 
        }else{
            // let client know what is not available
            // one the other or neither
        }

    } if (make === 'rainier'){
        request.post('http://localhost:3051/')
    }

    setTimeout( () => {
        return res.status(200).send({ make: make })
    }, 2000)
})

PORT = 3030;
app.listen( PORT, () => console.log(`Main server is listening on port ${PORT}`));