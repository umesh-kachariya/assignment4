var mongoose = require('mongoose');
var Schema = mongoose.Schema;
BookSchema = new Schema({
    title: String,
    author: String,
    price: Number,
    pages: Number,
    avg_reviews: Number,
    n_reviews: Number,
    star: String,
    dimensions: String,
    weight: String,
    language: String,
    publisher: String,
    ISBN_13: String,
    complete_link: String
});
module.exports = mongoose.model('Book', BookSchema);
