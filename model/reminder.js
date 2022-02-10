const mongoose = require('mongoose')


const ReminderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  medicines: [String],
  schedule: {
    type: String,
    required: true
  },
  cronFunction: {
    type: Object
  }
})

const Reminder = mongoose.model('Reminder', ReminderSchema)

module.exports = Reminder