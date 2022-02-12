const Reminder = require('./../model/reminder')
const sendEmail = require('./../mailer')
require('dotenv').config({path: './../.env'})

const reminderController = {}

reminderController.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find()
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
    await reminder.save()
    res.send({success: 'ok'})
  } catch(err){
    res.send({error: err})
  }
}

reminderController.deleteReminder = async (req,res) => {
    console.log('entered delete reminder funx')
    const { _id } = req.params
    console.log('od: ', _id)
    const reminder = await Reminder.findById(_id)
    console.log('reminder: ',reminder)
    Reminder.deleteOne({_id: _id})
    .then(resp => {
      res.end()

    }).catch(err => {
      res.send(err)
    })
}

module.exports = reminderController