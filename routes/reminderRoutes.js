const express = require('express')
const {getReminders, addReminder, deleteReminder } = require('./../controllers/reminderController')
const reminderRouter = express.Router()

reminderRouter.get('/', getReminders)
reminderRouter.post('/', addReminder)
reminderRouter.delete('/', deleteReminder)


module.exports = reminderRouter

