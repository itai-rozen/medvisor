const express = require('express')
const { addDrug, deleteDrug } = require('./../controllers/drugController')
const drugRouter = express.Router()


drugRouter.post('/addDrug', addDrug)
drugRouter.post('/deleteDrug', deleteDrug)
module.exports = drugRouter
