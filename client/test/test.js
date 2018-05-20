// require('mocha-testcheck').install(); // gen is now a global variable
const faker = require('faker');
const _ = require('lodash');
const { assert, expect } = require('chai')
const { postOrderCall, getOrdersCall } = require('../src/data/data')

describe('Post Order', function(){

    describe('dynamic order', function(){

        let statusCode;

        beforeEach(function(done){
            // create a random order with valid properties some of the time
            let makes = ['anvil', 'model', faker.random.word()];
            let make = makes[Math.floor(Math.random() * makes.length)];
            
            let models = ['pugetsound','olympic', 'anvil','wile','roadrunner', faker.random.word()];
            let model = models[Math.floor(Math.random() * models.length)];

            let packages = ['std','super','elite', 'mtn', 'ltd', '14k', faker.random.word()];
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

        for(let i = 0; i < 30; i++){

            it('status code should equal 200', function(){
                assert.equal(statusCode, 200);
            })

        }

    })

    describe('acme invalid package', function(){
        
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
            assert.equal(response.data.package, false);
        })

        it('order_id should be null', function(){
            assert.isNotString(response.order_id);
        })

        it('order_id should be null', function(){
            assert.isNotNumber(response.order_id);
        })
        
    });

    describe('acme invalid model', function(){
        
        let order = { make:'acme', model:'not_a_model', package:'super', id:'12344' }
        let data = {};
        
        beforeEach(function(done){
            
            postOrderCall(order).then( res => {
                data = res.data;
                done();
            })
            
        })
        
        it('make should be acme', function(){
            assert.equal(data.make, 'acme');
        })
        
        it('model should be false', function(){
            assert.equal(data.model, false)
        })
        
        it('package should be super', function(){
            assert.equal(data.package, 'super');
        })

        it('order_id should be null', function(){
            // console.log('should be null', typeof data.order_id);
            assert.isNotNumber(data.order_id);
        })

        it('order_id should be null', function(){
            // console.log('should be null', typeof data.order_id);
            assert.isNotString(data.order_id);
        })
        
    });

    describe('all valid for acme', function(){
        
        let order = { make:'acme', model:'anvil', package:'std', id:'12345' }
        let data = {};

        beforeEach(function(done){
            
            postOrderCall(order).then( res => {
                data = res.data;
                done();
            })
            
        })

        it('make should be acme', function(){
            assert.equal(data.make, 'acme');
        })
        
        it('object should equal', function(){
            assert.isNumber(data.order_id);
        })
        
    });

    describe('all valid for rainer', function(){
        
        let order = { make:'rainier', model:'olympic', package:'mtn', id:'12345' }
        let data = {};

        beforeEach(function(done){
            
            postOrderCall(order).then( res => {
                data = res.data;
                done();
            })
            
        })

        it('make is rainier', function(){
            assert.equal(data.make, 'rainier')
        })
        
        it('order_id is a number', function(){
            assert.isNumber(data.order_id * 1);
        })
        
        
    });
    
})

describe('Get Order', function(){
    describe('status', function(){

        let status;
        let data;

        beforeEach(function(done){

            getOrdersCall().then( res => {
                status = res.status
                data = res.data
                done();
            })

        })

        it('should be an array', function(){
            assert.isArray(data)
        })

        it('status code should equal 200', function(){
            assert.equal(status, 200);
        })

    })
})