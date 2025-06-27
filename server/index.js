if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors');
const helmet = require('helmet')
const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/learn-langg'
mongoose.connect(dbUrl)

const dbCon = mongoose.connection
dbCon.on('error', console.error.bind(console, 'connection error: '))
dbCon.once('open', () => {
    console.log('Database connected')
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(helmet())

app.get('/', (req, res) => {
    res.send('LearnLangg App');
});

app.get('/api/lessons', (req, res) => {
    res.json([
        { id: 1, title: 'Lesson 1' },
        { id: 2, title: 'Lesson 2' }
    ]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});