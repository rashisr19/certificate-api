var express = require('express');
var app = express();
// var mongo = require('mongodb').MongoClient;
// var assert = require('assert');
var bodyParser = require('body-parser');
// var ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');


var Student = require('./student');

//Configuring Port
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
    console.log('Student port running on :', app.get('port'));
});

const url = 'mongodb://localhost:27017/student';
const connect  = mongoose.connect(url, { useFindAndModify: false,  useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected correctly to MongoDB..');
}, (err) => { console.log(err); });

app.post('/students', function (req, res) {
    Student.create(req.body)
    .then((student) => { 
        console.log('Student details posted ',student);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/students', function(req, res) {
    Student.find({})
    .then((students) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(students);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/students/:id', function(req, res) {
    Student.findById(req.params.id)
    .then((student) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => next(err))
    .catch((err) => next(err));
})

app.get('/', function(req, res) {
    res.send('Hello in students port..');
})