const mongoose = require('mongoose')


const PatientSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type:String
  },
  medicines: [{
    drugNamק: {
      type: String
    },
    isWhenNeeded: {
      type: Boolean,
      default: false
    },
    unitAmount: {
      type: Number
    },
    times: {
      type: Number
    },
    timeUnit: {
      type: Number
    },
    startingData: {
      type: Date
    },
    isSetReminder: {
      type: Boolean,
      default: false
    },
    manualReminderDates: {
      type: Array,
      default: undefined
    }
  }]
})

const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient