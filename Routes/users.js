const router=require('express').Router();
const passport=require('passport');
let User=require('../models/user.model');
router.route('/recovery').post((req,res)=>{
 User.findOne({email:req.body.email},function(err,user){
     if(err){
      console.log(err);
     }
     else{
       if(user){
        var redir = { redirect: "/change" };
        return res.json(redir);
       }
       else{
        var redir = { redirect: '/signup'};
        return res.json(redir);
       }
     }
 })
});
router.route('/change').post((req,res)=>{
    User.updateOne({email:req.body.email},{password:req.body.passport},function(err,user){
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
        }
    })
});
router.route('/signup').post((req,res)=>{
const Users=new User({ username : req.body.username,email: req.body.email});   
    User.register(Users,req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
        }
        else{
            passport.authenticate("local")(req,res,function(){
                console.log(user);
            });
        }
    })
});
router.route('/login').post((req,res)=>{
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    req.login(user,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req,res,function(){
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