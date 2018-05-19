var { Mongoose } = require('mongoose')
var mongoose = new Mongoose();

var { Mockgoose } = require('mockgoose')
var mockgoose = new Mockgoose(mongoose);

var uri = '../';

module.exports = {
    connectToMockDatabase(){
        mockgoose.prepareStorage().then(function() {
            		
            mongoose.connect( uri )
            mongoose.connection.on('connected', () => {  
                console.log('db connection is now open');
            }); 

        });
    }
}