var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

var Certificate = require('./certificate');
const { response } = require('express');

//Configuring Port
app.set('port', (process.env.PORT || 8000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
    console.log('Certificate port running on :', app.get('port'));
});

const url = 'mongodb://localhost:27017/course';
const connect  = mongoose.connect(url, { useFindAndModify: false,  useUnifiedTopology: true, useNewUrlParser: true});

connect.then((db) => {
  console.log('Connected correctly to MongoDB..');
}, (err) => { console.log(err); });

app.get('/', function(req, res) {
    res.send('Hello in certificate port...');
});

app.post('/certificates', function (req, res) {
    var new_cert = {
        courseId : mongoose.Types.ObjectId(req.body.courseId),
        studentId : mongoose.Types.ObjectId(req.body.studentId),
        completionDate : req.body.completionDate

    }
    Certificate.create(new_cert)
    .then((certificate) => { 
        console.log('Certificate details posted ',certificate);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(certificate);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/certificates', function(req, res) {
    Certificate.find({})
    .then((certificates) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(certificates);
    }, (err) => next(err))
    .catch((err) => next(err));
});

app.get('/certificates/:id', function(req, res, next) {
    Certificate.findById(req.params.id)
    .then((certificate) => {
        if(certificate) {
            axios.get('http://localhost:3000/students/' + certificate.studentId)
            .then((response) => {
                var certificatedata = { Student : response.data, Course : '' }

                axios.get('http://localhost:5000/courses/' + certificate.courseId)
                .then((response) => {
                    certificatedata.Course = response.data;
                    res.json(certificatedata);
                }, (err) => next(err))
                .catch((err) => next(err));
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            res.send('Invalid Certificate Number!');
        }
    })
})