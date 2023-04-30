let express = require("express"); 
let mongoose = require("mongoose"); 
let passport = require("passport"); 
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv').config(); 

let app = express(); 

require('./passport-config')(passport); 

//express session 

app.use(session({
    'secret' : process.env.SECRET,
    resave: false,
    saveUninitialized : false
})); 

app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); 


app.set("view engine", "ejs"); 

mongoose.connect(process.env.MONGOOSE_URI,  {
    useNewUrlParser: true ,useUnifiedTopology: true
}).then(()=>{console.log("MongoDB Connected")});


app.use(express.urlencoded({extended: false}));
 
app.use('/', require('./routes/login'));


// GET end point
app.get('/', isAuthenticated, (req, res)=>{
    // res.send("Get request "); 
    res.render("home", {'data': 'data-random'});
});

function isAuthenticated(req, res, next){
    console.log("req authenciated ? ", req.isAuthenticated());
    if(req.isAuthenticated()){
        return next(); 
    }
    res.redirect("/login");
}

app.listen(process.env.PORT | 3000); 