const Joi = require('joi');
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    user : {
        type: new mongoose.Schema({
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
        
        }),
        required: true,
    },
    post : {
        type: new mongoose.Schema({
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
        }),
        required: true
        
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    rentalFee: {
        type: Number,
        min: 0
    }

});

const Rental = mongoose.model('Retal' , rentalSchema);

function validateRental(rental){
    const schema = {
        userId: Joi.string().required(),
        postId : Joi.String().required()
    }

    return Joi.validate(rental, schema);
}
exports.validate = validateRental;
exports.Rental = Rental;