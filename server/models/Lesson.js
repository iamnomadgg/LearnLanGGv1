const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    audioUrl: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Lesson', LessonSchema);
