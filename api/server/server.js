require('dotenv').config();

const express = require('express'),
      request = require('superagent'),
      bodyParser = require('body-parser'),
      _ = require('lodash');

// normally should include .env inside .gitignore
const ACME_API_KEY = process.env.ACME_API_KEY;  
const app = express();

app.use(bodyParser.json());

app.post('/order/:make/:model/:package/:customer_id', (req,res) => {

    let { make, model, package, customer_id } = req.params
    const id = customer_id;

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
        res.status(200).send({make,model,package,id});
    }

    if(make === 'acme'){

        const { models, packages } = supplies.acme;

        whatsAvailable( models, packages );

        if(model_available && package_available){
            //send order to acme

            request.post(`http://localhost:3050/acme/api/v45.1/order/${ACME_API_KEY}/${model}/${package}`)
                .end( (err, acme_res) => {
                // console.log('err: ', err);
                console.log('acme_res: ', acme_res.text);




            }) 

        } else {
            notAvailableResponse(model, package)
        }

    } if (make === 'rainier'){

        const { models, packages } = supplies.rainier;

        whatsAvailable(models,packages);

        if(model_available && package_available){
            // send order to rainier
            






        } else {
            notAvailableResponse(model, package)
        }

    } else {
        // the client requested for an unavailable supplier, but
        // maybe the client chose a valid the model or package 
 
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
            package: package_available || UNAVAILABLE
        })
    }

})

PORT = 3030;
app.listen( PORT, () => console.log(`Main server is listening on port ${PORT}`));