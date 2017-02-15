// get an instance of mongoose and mongoose.Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
const userShema = new Schema({ 
  name: String, 
  password: String, 
  admin: Boolean 
});

userShema.methods.comparePassword = function(password){
  return Promise.resolve(this.password === password);
};

module.exports = mongoose.model('User', userShema);