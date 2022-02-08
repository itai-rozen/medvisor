const Patient = require('./../model/medUser')
require('dotenv').config({path: './../.env'})

const drugController = {}


drugController.addDrug = async (req,res) => {
  try{
    const { email,drugName,isWhenNeeded,unitAmount,times,timeUnit,notes, description } = await req.body
    const newMedicineObject = {
      drugName,
      isWhenNeeded,
      unitAmount,
      times,
      timeUnit,
      notes, 
      description
    }
    await Patient.findOne({email: email}, {$push: {medicins: {newMedicineObject}}})
    res.send({success: 'ok'})
  } catch(err){
    res.send({error: err})
  }
}

drugController.deleteDrug = async (req,res) => {

  try {
    const { email, drugName } = await req.body
    await   Patient.findOne({ email: email }, { $pull: { medicines: { drugName: drugName } }}, 
      { safe: true, multi:true })
  }catch(err){
    res.send({error: err})
  }
}

module.exports = drugController