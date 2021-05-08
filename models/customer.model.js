const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;
const customerSchema=new Schema(
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
customerSchema.plugin(passportLocalMongoose,{usernameField: 'name'});
const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;