const express = require('express')
const {getMeds } = require('./../controllers/medController')
const router = express.Router()

router.get('/', getMeds  )

router.post('/auth', )

module.exports = router

