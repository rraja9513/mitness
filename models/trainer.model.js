const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const trainerSchema=new Schema(
    {
        name:{
                   type:String,
                   required:true,
                   unique:true
        },
        email:{
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true
        }
    },
    {
        timestamps:true,
    }
);
trainerSchema.plugin(passportLocalMongoose,{usernameField: 'name'});
const Trainer=mongoose.model('Trainer',trainerSchema);
module.exports=Trainer;