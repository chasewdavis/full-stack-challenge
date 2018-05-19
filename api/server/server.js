// normally should include .env inside .gitignore
require('dotenv').config();
const ACME_API_KEY = process.env.ACME_API_KEY;  
const CONNECTION_STRING = process.env.CONNECTION_STRING; // connection is intercepted by mockgoose anyways

const express = require('express'),
      request = require('superagent'),
      bodyParser = require('body-parser'),
      _ = require('lodash');

const { Mongoose } = require('mongoose')
const mongoose = new Mongoose();

const { Mockgoose } = require('mockgoose')
const mockgoose = new Mockgoose(mongoose);

const app = express();

app.use(bodyParser.json());

// may have to wrap entire server around mockgoose? 
mockgoose.prepareStorage().then(function() {
    
const db = mongoose.connection

mongoose.connect( CONNECTION_STRING );

var OrderSchema = mongoose.Schema({

    // from user ( when user input is valid )
    make: String,
    model: String,
    package: String,
    customer_id: String,

    // from supplier
    order_id: Number
    
})

var Order = mongoose.model('Order', OrderSchema)

app.get('/order', (req,res) => {
    // basically like select * from orders and in JSON format
    Order.find({}, (err, orders) => {
        err ? res.status(503) : res.status(200).send(orders);
    })
})


app.post('/order/:make/:model/:package/:customer_id', (req,res) => {

    let { make, model, package, customer_id } = req.params

    const supplies = {
        acme : {
            make: 'acme',
            models: ['anvil','wile','roadrunner'],
            packages: ['std','super','elite']
        },
        rainier: {
            make: 'rainier',
            models: ['pugetsound','olympic'],
            packages: ['mtn','ltd','14k']
        }
    }

    let model_available;
    let package_available;
    const UNAVAILABLE = 'UNAVAILABLE';
 
    function whatsAvailable(models, packages){
        if(models.includes(model)){
            model_available = true;
        }
        if(packages.includes(package)){
            package_available = true;
        }
    }

    // client asked for valid make but invalid model and / or package
    // let client know what is not available
    function notAvailableResponse(model, package){
        model = model_available ? model : UNAVAILABLE;
        package = package_available ? package : UNAVAILABLE;
        res.status(200).send({make,model,package,customer_id});
    }

    // rather than writing the same code twice
    function saveAndSendOrder(supplierResponse){

        // because order response is slightly different depending on the supplier
        const order_id = supplierResponse.body.order || supplierResponse.body.order_id

        // from client ( all valid inputs )
        let ord = new Order;
        ord.make = make;
        ord.model = model;
        ord.package = package;
        ord.customer_id = customer_id;
        // from supplier
        ord.order_id = order_id
        
        ord.save(function(err, data){
            if(err){
                res.status(500).send('error saving to database: ', err)
            } else {
                res.status(200).send({
                    make,
                    model,
                    package,
                    customer_id,
                    // from supplier
                    order_id: ord.order_id * 1
                })
            }
        })
    }

    if(make === 'acme'){

        const { models, packages } = supplies.acme;

        whatsAvailable( models, packages );

        if(model_available && package_available){
            // send order to acme
            // save order in database
            request.post(`http://localhost:3050/acme/api/v45.1/order/${ACME_API_KEY}/${model}/${package}`)
                .then( acme_res => {
   
                if(acme_res.status === 200){
                    
                    saveAndSendOrder(acme_res);

                }else{
                    res.status(500).send('oops, looks like our server may need to update its api key');
                }

            }) 

        } else {
            notAvailableResponse(model, package)
        }

    } else if (make === 'rainier'){ 

        const { models, packages } = supplies.rainier;

        whatsAvailable(models,packages);

        if(model_available && package_available){
            // send order to rainier
            // first needs a token from rainier
            const storefront = 'ccas-bb9630c04f';
 
            request
                .get(`http://localhost:3051/rainier/v10.0/nonce_token/${storefront}`)
                .then( tokenResponse => {

                    const { nonce_token } = tokenResponse.body

                    request.post(`http://localhost:3051/rainier/v10.0/request_customized_model/${nonce_token}/${model}/${package}`)
                    .then(rainier_res => {

                        saveAndSendOrder(rainier_res);

                    })
                })

        } else {
            notAvailableResponse(model, package)
        }

    } else {
        // the client requested for an unavailable supplier,
        // but maybe the client chose a valid model or package
        // help them find what they are looking for 
 
        _.forIn(supplies, (val, key) => {

            if( val.models.includes(model) ){
                model_available = val.make
            }
            if( val.packages.includes(package) ){
                package_available = val.make
            }
        })

        res.status(200).send({
            make: UNAVAILABLE,
            model: model_available || UNAVAILABLE,
            package: package_available || UNAVAILABLE,
            customer_id,
            order_id: UNAVAILABLE
        })
    }

})



}); //mockgoose closing function


PORT = 3030;
app.listen( PORT, () => console.log(`Main server is listening on port ${PORT}`));