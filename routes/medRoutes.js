const express = require('express')
const {getMeds, authUser, addDrug } = require('./../controllers/medController')
const auth = require('./../middleware/auth')
const router = express.Router()

router.get('/', getMeds  )
router.post('/addDrug', addDrug)
router.post('/auth', authUser )

module.exports = router

