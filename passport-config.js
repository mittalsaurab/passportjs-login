let LocalStrategy = require("passport-local"); 

let {findUserByEmail, findUserByID} = require('./db-functions'); 

let bcrypt = require("bcrypt"); 


function initialize(passport){

    let authUser = (email, password, done)=>{

        findUserByEmail(email)
        .then((user)=>{
            console.log("Findign user : ", user);
            if(user == null ){
                done(null, null, {message : 'auth failed'}); 
            }else{
                bcrypt.compare(password, user.password)
                .then((matched)=>{
                    console.log("Password matched: ", user);
                    done(null, user, {message : 'auth succedded'}); 
                })
                .catch((err)=>{
                    console.log("Password failed: ", user);
                    done(null, null, {message : "password didn't match"}); 
                });
            }
        })
        .catch((err)=>{
            console.log("Error inside intialize", err); 
        }); 
    }

    passport.use(new LocalStrategy({usernameField : 'email'}, authUser)); 

    passport.serializeUser((user, done)=>{  done(null, user.id)}); 
    
    passport.deserializeUser((id, done)=>{
        findUserByID(id)
        .then((user)=>{
            done(null, user); 
        })
    })
}

module.exports = initialize ;