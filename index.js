var express = require('express');
var mongoose = require('mongoose');
var app = express();
var database = require('./config/database');
var bodyParser = require('body-parser');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

mongoose.connect(database.url);

var Book = require('./models/books');

// Get all book-info from the database
app.get('/api/books', function (req, res) {
    Book.find()
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get a book with a specific ID
app.get('/api/books/:book_id', function (req, res) {
    let id = req.params.book_id;
    Book.findById(id)
        .then(book => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.json(book);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a new book and send back all books after creation
app.post('/api/books', function (req, res) {
    console.log(req.body);

    Book.create(req.body)
        .then(book => {
            Book.find()
                .then(books => {
                    res.json(books);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Update the title and price of an existing book
app.put('/api/books/:book_id', function (req, res) {
    let id = req.params.book_id;
    var data = {
        title: req.body.title,
        price: req.body.price
    };

    Book.findByIdAndUpdate(id, data)
        .then(book => {
            res.send('Successfully! Book updated - ' + book.title);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete a book by ID
app.delete('/api/books/:book_id', function (req, res) {
    let id = req.params.book_id;
    Book.findOneAndDelete(id)
        .then(() => {
            res.send('Successfully! Book has been Deleted.');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});


app.listen(port, () => {
    console.log("App listening on port : " + port);
});
