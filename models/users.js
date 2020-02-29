const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    isPremium : {
        type: Boolean,
        default: false
    },
    email : {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }

});
const User = mongoose.model('User' , userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(3).max(20).required(),
        isPremium : Joi.boolean()

    }
    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;
