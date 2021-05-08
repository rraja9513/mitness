const router=require('express').Router();
const passport=require('passport');
let Customer=require('../models/customer.model');
router.route('/').get((req,res)=>{
    Customer.find()
    .then(customers=>res.json(customers))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/forgotpassword').post((req,res)=>{
    Customer.findOne({ email: req.body.email })
    .then((customer) => {
        customer.setPassword(req.body.password,(err, customer) => {
            if (err) return next(err);
            customer.save();
            res.status(200).json({ message: 'password change successful' });
        });
    })
});
router.route('/changepassword').post((req,res)=>{
    Customer.findOne({ email: req.body.email })
    .then((customer) => {
        customer.changePassword(req.body.oldpassword, req.body.newpassword,(err, customer) => {
            if (err) return next(err);
            customer.save();
            res.status(200).json({ message: 'password change successful' });
        });
    })
});
router.route('/signup').post((req,res)=>{
const Customers=new Customer({ name : req.body.name,email: req.body.email});   
    Customer.register(Customers,req.body.password,function(err,customer){
        if(err)
        {
            console.log(err);
        }
        else{
            passport.authenticate("customerLocal")(req,res,function(){
                res.status(200).json({ message: 'Signed in successful' });
            });
        }
    })
});
router.route('/login').post((req,res)=>{
    const customer=new Customer({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    req.login(customer,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("customerLocal")(req,res,function(){
                if (req.user) {
                    var redir = { redirect: "/welcome" };
                    return res.json(redir);
              } else {
                    var redir = { redirect: '/signup'};
                    return res.json(redir);
              }
            });
        }
    });
 });
 module.exports=router;