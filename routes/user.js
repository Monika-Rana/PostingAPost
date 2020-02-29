const express = require('express');
const mongoose = require('mongoose');
const { User , validate} = rerquire('../models/users');


const router = express.Router();

router.get('/' , async (req, res, next)=> {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id' , async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) return res.status(404).send('The customer with the given Id not found');

    res.send(user);
});

router.post('/' , async (req, res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
        name: req.body.name,
        isPremium : req.body.isPremium,
        email : req.body.email

    });
    user = await user.save();
    res.send(user);
});

router.put('/:id' , async (req, res, next) => {
    const {error} = validate(req.body);

    if(error) return res.status(404).send(error.details[0].message);
    const user = await User.findbyIdAndUpdate(req.params.id, 
    {
        name: req.body.name,
        isPremium: req.body.isPremium,
        email : req.body.email
    },
    {new : true});
    if(!user) return res.status(404).send('THE User with this Id is not Found');

    res.send(user)
});
router.delete('/:id' , async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(404).send('THE User with this Id is not Found');

    res.send(user)
});
module.exports = router;