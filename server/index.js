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

app.get('/api/lessons/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
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

app.put('/api/lessons/:id', async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
                audioUrl: req.body.audioUrl,
            },
            { new: true, runValidators: true }
        );

        if (!updatedLesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.json(updatedLesson);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error updating lesson' });
    }
});

app.delete('/api/lessons/:id', async (req, res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);

        if (!deletedLesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        res.json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error deleting lesson' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});