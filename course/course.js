const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: {
        type : String
    },
    duration: {
        type : String
    },
    price: {
        type : String
    }
});

var Course = mongoose.model('Course', courseSchema);

module.exports = Course;