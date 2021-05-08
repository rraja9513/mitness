const router=require('express').Router();
const passport=require('passport');
let Trainer=require('../models/trainer.model');
router.route('/').get((req,res)=>{
    Trainer.find()
    .then(trainers=>res.json(trainers))
    .catch(err=>res.status(400).json('Error:'+err));
});
router.route('/forgotpassword').post((req,res)=>{
    Trainer.findOne({ email: req.body.email })
    .then((trainer) => {
        trainer.setPassword(req.body.password,(err, trainer) => {
            if (err) return next(err);
            trainer.save();
            res.status(200).json({ message: 'password change successful' });
        });
    })
});
router.route('/changepassword').post((req,res)=>{
    Trainer.findOne({ email: req.body.email })
    .then((trainer) => {
        trainer.changePassword(req.body.oldpassword, req.body.newpassword,(err, trainer) => {
            if (err) return next(err);
            trainer.save();
            res.status(200).json({ message: 'password change successful' });
        });
    })
});
router.route('/signup').post((req,res)=>{
const Trainers=new Trainer({ name : req.body.name,email: req.body.email});   
    Trainer.register(Trainers,req.body.password,function(err,trainer){
        if(err)
        {
            console.log(err);
        }
        else{
            passport.authenticate("trainerLocal")(req,res,function(){
                res.status(200).json({ message: 'Signed in successful' });
            });
        }
    })
});
router.route('/login').post((req,res)=>{
    const trainer=new Trainer({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    req.login(trainer,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("trainerLocal")(req,res,function(){
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