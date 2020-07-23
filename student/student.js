const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var studentSchema = new Schema({
    name: {
        type : String
    },
    age: {
        type : String
    },
    email: {
        type : String
    }
});

var Student = mongoose.model('Student', studentSchema);

module.exports = Student;