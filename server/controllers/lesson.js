const Lesson = require('../models/Lesson')

module.exports.fetchAll = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.status(200).json(lessons);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch lessons', details: err.message });
    }
}

module.exports.fetchById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
        res.json(lesson);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.insert = async (req, res) => {
    try {
        const { title, content, audioUrl } = req.body;
        const newLesson = new Lesson({ title, content, audioUrl });
        await newLesson.save();
        res.status(201).json({ message: 'Lesson saved!', lesson: newLesson });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save lesson', details: err.message });
    }
}

module.exports.edit = async (req, res) => {
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
}

module.exports.remove = async (req, res) => {
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
}