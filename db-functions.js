let mongoose = require('mongoose'); 
let userModel = require("./models/user"); 

let findUserByEmail= (email) =>{ 
    return userModel.findOne({email : email}); 
};

let findUserByID= (id) =>{ 
    return userModel.findOne({id : id}); 
};


module.exports = {'findUserByEmail' :  findUserByEmail, 'findUserByID' : findUserByID } ; 