// require('mocha-testcheck').install(); // gen is now a global variable
const faker = require('faker');
const _ = require('lodash');
const { assert, expect } = require('chai')
const { postOrderCall, getOrders } = require('../src/data/data')

describe.skip('Post Order', function(){

    describe('dynamic order', function(){

        let statusCode;

        beforeEach(function(done){
            // create a random order with valid properties some of the times
            let makes = ['anvil', 'model', faker.random.word()];
            let make = makes[Math.floor(Math.random() * makes.length)];
            
            let models = ['pugetsound','olympic', 'anvil','wile','roadrunner', faker.random.word()];
            let model = models[Math.floor(Math.random() * models.length)];

            let packages = ['std','super','elite', faker.random.word()];
            let package = packages[Math.floor(Math.random() * packages.length)];

            let id = faker.random.number()

            let order = {
                make, 
                model, 
                package,
                id
            }
            
            postOrderCall(order).then( res => {
                statusCode = res.status;
                done();
            })
            
        })

        for(let i = 0; i < 50; i++){

            it('status code should equal 200', function(){
                assert.equal(statusCode, 200);
            })

        }

    })

    describe('static order invalid package', function(){
        
        let order = { make:'acme', model:'anvil', package:'ownvednd', id:'12344' }
        let response = {};
        
        beforeEach(function(done){
            
            postOrderCall(order).then( res => {
                response = res;
                done();
            })
            
        })
        
        it('make should be acme', function(){
            assert.equal(response.data.make, 'acme');
        })
        
        it('model should be anvil', function(){
            assert.equal(response.data.model, 'anvil')
        })
        
        it('package should be unavailable', function(){
            assert.equal(response.data.package, 'UNAVAILABLE');
        })
        
    });

    describe('static order all valid for acme', function(){
        
        let order = { make:'acme', model:'anvil', package:'std', id:'12345' }
        let response = {};
        
        beforeEach(function(done){
            
            postOrderCall(order).then( res => {
                response = res;
                done();
            })
            
        })

        it('status 200', function(){
            assert.equal(response.status, 200)
        })
        
        it('object should equal', function(){
            console.log(response.data)
            assert.equal(response.data, { make:'acme', model:'anvil', package:'std', id:'12345' });
        })
        
        
    });
    
})

describe('Get Order', function(){
    describe('status', function(){

        let status;

        beforeEach(function(done){

            getOrders().then( res => {
                console.log('data is', res.data)
                status = res.status
                done();
            })

        })

        it('status code should equal 200', function(){
            assert.equal(status, 200);
        })

    })
})