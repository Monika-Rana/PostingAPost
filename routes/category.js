const  {Category, validate} = require('../models/categories');
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

router.get('/' , async (req, res) => {
   const category = Category.find().sort();
   res.send(category);
});

router.get('/:id' , async (req, res) => {
    const category = Category.findById(req.params.id);
    if(!category) res.status(404).send("Category with give Id Not Found");

    res.send(category);

});

router.post('/' , async(req, res) => {
    const {error}  = validate(req.body);
if(error) return res.send(error.details[0].message);
let category =  new Category({
    name: req.body.name,
    
});
category = await category.save();
res.send(category);

});

router.delete('/:id' , async(req, res) => {
    const category = Category.findByIdAndRemove(req.params.id); 

    if(!category) res.status(404).send("Category with give Id Not Found");

    res.send(category);
});

router.put('/:id' , async (req, res) => {
    const {error} = validate(req.body);
    if(error)  res.status(404).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(req.params.id , {name : req.body.name}, {new : true});
    if(!category)  res.status(404).send("Category with give Id Not Found");

    res.send(category);
});



