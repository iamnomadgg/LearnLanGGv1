const mongoose = require('mongoose');

const maxTitleLength = process.env.MAX_LESSON_TITLE_LENGTH
    ? parseInt(process.env.MAX_LESSON_TITLE_LENGTH)
    : 60;

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: maxTitleLength,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Lesson', LessonSchema);
