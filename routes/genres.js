const express = require('express');
const Joi  = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
        name : {
        type: String, 
        required:true, 
        minlength:3, 
        maxlength:10
        }
}));

router.get('/', async (req,res)=>{
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.post('/', async (req,res)=>{

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({name : req.body.name});
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req,res)=>{

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new:true});
    if(!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

router.delete('/:id', async (req,res)=>{
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if(!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

function findGenre(genre){
    return found = genres.find(c=> c.id === genre.id);
}

function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema);
}

module.exports = router;