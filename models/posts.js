const Joi = require('joi');
const mongoose = require('mongoose');
const {categorySchema} = require('./categories');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    yearlySubscription : {
        type: Number,
        default: false,
        minlength: 0,
        maxlength: 255
    }
});


const Post = mongoose.model('Post' , postSchema);
function validatePost(post){
    const schema = {
        title: Joi.string().required().min(3).max(255),
        categoryId : Joi.required().string(),
        yearlySubscription : Joi.number().min(0).max(255)
    };

   return Joi.validate(post,schema);
}

exports.Post = Post;
exports.validate = validatePost;