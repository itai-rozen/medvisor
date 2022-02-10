const Reminder = require('./../model/reminder')
const sendEmail = require('./../mailer')
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
    const { email, medicines, schedule } = await req.body
    const cronFunction = sendEmail(email,medicines.join('\n'),schedule)
    const reminder = new Reminder({email,medicines,schedule,cronFunction})
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
    const reminder = Reminder.findById(_id)
    reminder.cronFunction.destroy()
    await Reminder.findByIdAndDelete(_id)
    res.send({success: 'ok'})
  }catch(err){
    res.send({error: err})
  }
}

module.exports = reminderController