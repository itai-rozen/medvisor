const mongoose = require('mongoose')


const ReminderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  medicines: [{
    drugName: {
      type: String,
      required: true
    }
  }],
  schedule: {
    type: String,
    required: true
  },
  dates: {
    type: Array,
    default: undefined
  }
})

const Reminder = mongoose.model('Reminder', ReminderSchema)

module.exports = Reminder