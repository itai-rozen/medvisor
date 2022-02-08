const express = require('express')
const {getMeds, authUser, addDrug } = require('./../controllers/medController')
const reminderRouter = express.Router()

module.exports = reminderRouter

