if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Vocabulary = require('../models/Vocabulary');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/learn-langg'

async function seedVocabulary() {
    try {
        await mongoose.connect(dbUrl);
        console.log('MongoDB connected');

        const dataPath = path.join(__dirname, 'wordlist.json');
        const seedData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        await Vocabulary.deleteMany({});
        await Vocabulary.insertMany(seedData);

        console.log('Vocabulary seeded with common words!');
        mongoose.disconnect();
    } catch (err) {
        console.error('Seeding failed:', err);
        mongoose.disconnect();
    }
}

seedVocabulary();
