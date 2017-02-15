const app = require('./app');
const config = require('./config');
const mongoose = require('./app/lib/db');

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.mongo.host);

  const { host, port } = config.server;
  app.listen(port, port, () => {
    console.log(`Go ahead on  ${host}:${port}`);
  });
}); 

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
