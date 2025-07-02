const express = require('express')
const router = express.Router({ mergeParams: true })
const { fetchAll, fetchById, insert, edit, remove } = require('../controllers/lesson.js')

router.route('/all')
    .get(fetchAll)

router.route('/:id')
    .get(fetchById)

router.route('/')
    .post(insert)

router.route('/:id')
    .put(edit)

router.route('/:id')
    .delete(remove)

module.exports = router