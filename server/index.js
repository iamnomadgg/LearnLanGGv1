if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors');
const helmet = require('helmet')
const mongoose = require('mongoose')
const ServerError = require('./utils/ServerError')

const lessonRoutes = require('./routes/lesson')
const vocabRoutes = require('./routes/vocab')

const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, {})
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('DB connection error:', err));

const app = express()
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(helmet())

app.use('/api/lesson', lessonRoutes)
app.use('/api/vocab', vocabRoutes)

app.get('/', (req, res) => {
    res.send(process.env.APP_NAME);
});

app.all(/(.*)/, (req, res, next) => {
    next(new ServerError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    return res.status(statusCode).json({ message: err.message })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});