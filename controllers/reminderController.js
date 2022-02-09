const Patient = require('./../model/medUser')
const Reminder = require('./../model/reminder')
require('dotenv').config({path: './../.env'})

const reminderController = {}

reminderController.getReminders = async (req, res) => {
  try {
    const { email } = await req.body
    const reminders = await Reminder.find()
    console.log('reminders @getReminders @reminderController: ',reminders)
    res.send(reminders)
  }catch(err){
    console.log(err)
  }
}

reminderController.addReminder = async (req,res) => {
  try{
    const reminder = new Reminder(req.body)
    console.log('new reminder: ',reminder)
    await reminder.save()
    res.send({success: 'ok'})
  } catch(err){
    res.send({error: err})
  }
}

reminderController.deleteReminder = async (req,res) => {
  try {
    const { _id } = req.body
    await Reminder.findByIdAndDelete(_id)
    res.send({success: 'ok'})
  }catch(err){
    res.send({error: err})
  }
}

module.exports = reminderController