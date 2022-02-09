const Patient = require('./../model/medUser')
require('dotenv').config({path: './../.env'})

const drugController = {}


drugController.addDrug = async (req,res) => {
  console.log('entered addDrug func')
  try{
    const { email,drugName,isWhenNeeded,unitAmount,times,timeUnit,notes,rxId, description } = await req.body
    const newMedicineObject = {
      drugName,
      isWhenNeeded,
      unitAmount,
      times,
      timeUnit,
      notes, 
      rxId,
      description
    }
    const patient = await Patient.findOne({email: email})
    console.log('patient @addDrug: ',patient)
    patient.medicines.push(newMedicineObject)
    await patient.save()
    res.send({success: 'ok'})
  } catch(err){
    res.status(400).send(err)
  }
}

drugController.deleteDrug = async (req,res) => {
  try {
    const { email, drugName } = await req.body
    await Patient.updateOne({ email: email }, 
      {"$pull": {"medicines": {drugName: drugName}}}, { safe:true, multi:true})
    // patient.medicines.pull({drugName: drugName})
    // Patient.updateOne({ email: email }, { "pull": { "medicines": { "drugName": drugName } }}, { safe: true, multi:true }, function(err, obj) {
      //do something smart
    res.end()
  }catch(err){
    console.log(err)
    res.status(400).send({error: err})
  }
}

module.exports = drugController