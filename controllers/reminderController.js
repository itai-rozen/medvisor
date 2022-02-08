const Patient = require('./../model/medUser')
require('dotenv').config({path: './../.env'})

const reminderController = {}


reminderController.addReminder = async (req,res) => {
  try{
    const { email,drugName,isWhenNeeded,unitAmount,times,timeUnit,notes } = await req.body
    const newMedicineObject = {
      drugName,
      isWhenNeeded,
      unitAmount,
      times,
      timeUnit,
      notes
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