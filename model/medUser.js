const { min } = require('date-fns')
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
    drugName: {
      type: String,
      unique: true
    },
    isWhenNeeded: {
      type: Boolean,
      default: false
    },
    unitAmount: {
      type: Number,
      min: 0
    },
    times: {
      type: Number,
      min:0
    },
    timeUnit: {
      type: String,
    },
    notes: {
      type: String
    },
    rxId: {
      type: String
    },
    description: {
      type: String,
      default: undefined
    }
  }],
    reminders: [{
      durationInDays: {
        type: Number
      },
      daysInWeek: {
        type:Array,
        default: undefined
      },
      daysInMonth: {
        type: Array,
        default: undefined
      },
      medicines: {
        type: Array
      }
    }],
    manualReminderDates: {
      type: Array,
      default: undefined
    }
})

const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient