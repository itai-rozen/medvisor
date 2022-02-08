const express = require('express')
const {getMeds, authUser, getUser } = require('./../controllers/medController')
const auth = require('./../middleware/auth')
const router = express.Router()

router.get('/', getMeds  )
router.post('/user', getUser)
router.post('/auth', authUser )

module.exports = router

