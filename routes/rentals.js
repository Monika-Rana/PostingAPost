const {Rental, validate} = require('../models/rental');
const {Post} = require('../models/posts');
const {User} = require('../models/users');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/' ,async ( req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});
router.get('/:id' , async (req, res) => {
    const rentals = await Rental.findById(req.params.id);
    if(!rentals) return res.status(400).send('Rnetal with give Id not found');

    res.send(rentals);
});

router.post('/' , async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('Invalid User')

    const post = await Post.findById(req.body.postId);
    if(!post) return res.status(400).send('Invalid Post')

    let rental = new Rental({
        user : {
            _id: user._id,
            name: user.name,
            email : user.email
        },
        post : {
            _id : post._id,
            title : post.title,
            yearlySubscription : post.yearlySubscription
        }
    });
    rental = await rental.save();
    res.send(rental);
});

module.exports = router;