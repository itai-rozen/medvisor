const express = require('express')
const {getMeds, authUser } = require('./../controllers/medController')
const auth = require('./../middleware/auth')
const router = express.Router()

router.get('/', getMeds  )

router.post('/auth', authUser )

module.exports = router

