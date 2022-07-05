const Joi  = require('joi');
const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    username : {
        type: String, 
        required:true, 
        minlength:5, 
        maxlength:50
    },
    password : {
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
    email : {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    isAdmin : Boolean
});

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema);
}

exports.validate = validateUser;
exports.User = User;
