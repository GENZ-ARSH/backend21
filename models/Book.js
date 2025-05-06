const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    image_url: { type: String },
    link: { type: String, required: true },
    class: { type: String, required: true },
    exam: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
