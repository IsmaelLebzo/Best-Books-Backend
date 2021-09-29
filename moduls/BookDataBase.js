const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;