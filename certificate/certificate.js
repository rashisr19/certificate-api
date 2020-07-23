const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var certificateSchema = new Schema({
    courseId: {
        type : mongoose.SchemaTypes.ObjectId
    },
    studentId: {
        type : mongoose.SchemaTypes.ObjectId
    },
    completionDate: {
        type : Date
    }
});

var Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;