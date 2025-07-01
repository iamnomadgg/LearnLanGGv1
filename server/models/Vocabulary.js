const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    translation: {
        type: [String],
        required: true,
        validate: {
            validator: function (arr) {
                return arr.every(str => str.length <= 255);
            },
            message: 'Each translation must be 255 characters or fewer.',
        },
    },
    note: {
        type: String,
        default: '',
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['discarded', 'level1', 'level2', 'level3', 'level4', 'known'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Vocabulary', vocabularySchema);