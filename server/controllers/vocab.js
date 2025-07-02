const Vocabulary = require('../models/Vocabulary')

module.exports.fetch = async (req, res) => {
    const word = req.params.word.toLowerCase();
    try {
        const entry = await Vocabulary.findOne({ word });
        if (!entry) {
            return res.status(404).json({ message: 'Word not found' });
        }
        res.json(entry);
    } catch (err) {
        console.error('Error fetching vocabulary:', err);
        res.status(500).json({ message: 'Server error' });
    }
}