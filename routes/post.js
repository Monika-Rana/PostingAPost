const mongoose = require('mongoose');
const express= require('express');
const {Category } = require('../models/categories');
const {Post, validate} = require('../models/posts');

const router = express.Router();

router.get('/',async (req, res) => {
    const post = await Post.find().sort('name');
    res.send(post);
});

router.get('/:id' , async (req, res) => {
    const post = await Post.findById(req.param.id);
    if(!post) res.status(404).send('Post not found');

    res.send(post);
});

router.post('/' ,async (req, res) => {
    const {error} = validate(req.body);
    if(error) res.send(error.details[0].message);

    let post = new Post({
        title: req.body.title,
        category : {_id: category._id, name: category.name},
        yearlySubscription : req.body.yearlySubscription

    });
    post = await post.save();
    res.send(post);
});

router.put('/:id' ,async (req, res) =>{
    const {error} = validate(rq.body);
    if(error) req.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if(!category) req.status(400).send('category not found');

    const post = await Post.findByIdAndUpdate(req.params.id , {
        title: req.body.title,
        category : {_id : category._id, name: category.name},
        yearlySubscription : req.body.yearlySubscription
    }, {new: true});

    if(!post) res.status(404).send('post not fount');

    res.send(post);

});

router.delete('/:id' ,async  (req,res)=>{
    const post = await Post.findOneAndRemove(req.params.id);

    if(!post) return res.status(404).send('Not found');

    res.send(post);
});
module.exports = router;