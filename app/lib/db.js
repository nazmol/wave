const mongoose = require('mongoose');
const config = require('../../config')

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.host);
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

module.exports = mongoose;