let mongoose = require('mongoose'); 

let userSchema = new mongoose.Schema({
    name : {type : String, default : 'user' }, 
    email : {type : String }, 
    password : {type : String }
}); 

let userModel = mongoose.model('User', userSchema); 

module.exports = userModel; 