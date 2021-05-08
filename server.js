const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const session=require('express-session');
const passport=require('passport');
const Admin = require('./models/admin.model');
const Customer=require('./models/customer.model');
const Trainer=require('./models/trainer.model');
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
const port=process.env.PORT || 5000;
const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("Atlas started successfully")
})
passport.use('adminLocal',Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());
passport.use('customerLocal',Customer.createStrategy());
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());
passport.use('trainerLocal',Trainer.createStrategy());
passport.serializeUser(Trainer.serializeUser());
passport.deserializeUser(Trainer.deserializeUser());
const adminRouter=require('./Routes/admin');
const customerRouter=require('./Routes/customers');
const trainerRouter=require('./Routes/trainers');
app.use('/admin',adminRouter);
app.use('/customers',customerRouter);
app.use('/trainers',trainerRouter);
app.listen(port,function(){
    console.log("Server started Successfully");
});
