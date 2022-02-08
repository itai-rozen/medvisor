const Patient = require('./../model/medUser')
require('dotenv').config({path: './../.env'})

const reminderController = {}


reminderController.addReminder = async (req,res) => {
  try{
    // TODO verify if those are the params needed for setting reminders
    // also check their names
    
    const { email,drugObj, timeUnit, duration } = await req.body
    const newMedicineObject = {
    }
    await Patient.findOne({email: email}, {$push: {medicins: {newMedicineObject}}})
    res.send({success: 'ok'})
  } catch(err){
    res.send({error: err})
  }
}

reminderController.deleteReminder = async (req,res) => {

  try {
    const { email, drugName } = await req.body
    await   Patient.findOne({ _id: diveId }, { $pull: { medicines: { drugName: drugName } }}, 
      { safe: true, multi:true })
  }catch(err){
    res.send({error: err})
  }
}

module.exports = reminderController