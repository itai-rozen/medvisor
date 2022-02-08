const express = require('express')
const {getMeds, authUser, addDrug } = require('./../controllers/medController')
const drugRouter = express.Router()

module.exports = drugRouter
