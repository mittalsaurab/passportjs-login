let express = require('express'); 
let mongoose = require("mongoose"); 
let passport = require("passport"); 
let bcrypt = require("bcrypt"); 


let userModel = require('../models/user'); 

let router = express.Router(); 


router.get('/login',isNotAuthenticated,  (req, res)=>{
    // res.send('Login get'); 
    // console.log("Login GET request", req); 
    res.render("login");
}); 

router.get('/register',isNotAuthenticated,  (req, res)=>{
    // res.send('Register get '); 
    // console.log("Register GET request", req); 
    res.render("register");
})

router.delete('/logout', (req, res)=>{
    req.logOut(); 
    res.redirect('/login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
})); 

router.post('/register', isNotAuthenticated, (req, res)=>{
    // res.send('Register get '); 
    console.log("Register POST request", req.body); 
    
    let {name, email, password} = req.body; 


    userModel.findOne({email: email})
    .then((user)=>{
        if(user){
            console.log("User with email : ", email , " is already present");
            res.redirect('/register'); 
        }else{
            
            bcrypt.hash(password, 10).then((hashedPassword)=>{
                let User = new userModel({name, email , 'password' : hashedPassword}); 
            
                User.save()
                .then((user)=>{
                    console.log("Successfully saved job");
                    res.redirect("/login"); 
                }); 
            })

        }
    }).catch((err)=>{
        console.log("register error in mongoose operation", err); 
        res.redirect('/register');
    });

}); 

function isNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
       res.redirect('/'); 
    }
    next();  
}

module.exports = router;  
