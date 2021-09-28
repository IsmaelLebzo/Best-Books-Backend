'use strict';
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());
const PORT = process.env.PORT;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Books');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const BookModel = mongoose.model('Book', bookSchema);

function seedBook(){
    const BrokenGlass = new BookModel({
        title: 'Broken Glass',
        description: 'Broken Glass – a black comedy told by a disgraced teacher without much in the way of full stops or paragraph breaks.',
        status: 'Available',
        email: '1998lebzo@gmail.com'
    })
    const ALittleLife = new BookModel({
        title: 'A Little Life',
        description: 'This operatically harrowing American gay melodrama became an unlikely bestseller, and one of the most divisive novels of the century so far.',
        status: 'Available',
        email: 'Ismael.R@gmail.com'
    })
    const Darkmans = new BookModel({
        title: 'Darkmans',
        description: 'British fiction’s most anarchic author is as prolific as she is playful, but this freewheeling, visionary epic set around the Thames Gateway is her magnum opus.',
        status: 'Available',
        email: '1998lebzo@gmail.com'
    })

    BrokenGlass.save();
    ALittleLife.save();
    Darkmans.save();
}

// seedBook();

server.get('/books', booksHandler);

// localhost:3001/books?email=1998lebzo@gmail.com

function booksHandler(req,res){
    let email1 = req.query.email;
    BookModel.find({email:email1},(error,bookData)=>{
        if (error){
            console.log(error);
        }else{
            res.send(bookData);
        }
    })
}

server.get('/',homeHandler);

function homeHandler(req,res){
    res.send('Everything is working!')
}

server.listen(PORT,()=>{
    console.log(`HI msg reaches ${PORT}`);
})