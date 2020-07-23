var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


var Course = require('./course');

//Configuring Port
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
    console.log('Course port running on :', app.get('port'));
});

const url = 'mongodb://localhost:27017/course';
const connect  = mongoose.connect(url, { useFindAndModify: false,  useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected correctly to MongoDB..');
}, (err) => { console.log(err); });

app.post('/courses', function (req, res) {
    Course.create(req.body)
    .then((course) => { 
        console.log('Course details posted ',course);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/courses', function(req, res) {
    Course.find({})
    .then((courses) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(courses);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/courses/:id', function(req, res) {
    Course.findById(req.params.id)
    .then((course) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course);
    }, (err) => next(err))
    .catch((err) => next(err));
})

app.get('/', function(req, res) {
    res.send('Hello in course port...');
})