const express = require('express')
const { addDrug, deleteDrug, translateDescription } = require('./../controllers/drugController')
const drugRouter = express.Router()


drugRouter.post('/addDrug', addDrug)
drugRouter.post('/deleteDrug', deleteDrug)
drugRouter.post('/translate', translateDescription)
module.exports = drugRouter
