const express = require('express')
const router = express.Router({ mergeParams: true })
const { fetch } = require('../controllers/vocab.js')

router.route('/:word')
    .get(fetch)

module.exports = router