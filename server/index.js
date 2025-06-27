if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors');
const helmet = require('helmet')
const mongoose = require('mongoose')
const Lesson = require('./models/Lesson');


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/learn-langg'
mongoose.connect(dbUrl, {})
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('DB connection error:', err));

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(helmet())

app.get('/', (req, res) => {
    res.send('LearnLangg App');
});

app.get('/api/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch lessons', details: err.message });
    }
});


app.post('/api/lessons', async (req, res) => {
    try {
        const { title, content, audioUrl } = req.body;
        const newLesson = new Lesson({ title, content, audioUrl });
        await newLesson.save();
        res.status(201).json({ message: 'Lesson saved!', lesson: newLesson });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save lesson', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});