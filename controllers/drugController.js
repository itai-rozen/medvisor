const axios = require('axios')
const Patient = require('./../model/medUser')
require('dotenv').config({path: './../.env'})


const drugController = {}


drugController.addDrug = async (req,res) => {
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
    patient.medicines.push(newMedicineObject)
    await patient.save()
    res.send({success: 'ok'})
  } catch(err){
     console.log('error @addDrug: ',err)
    res.send({error:err})
  }
}

drugController.deleteDrug = async (req,res) => {
  try {
    const { email, drugName } = await req.body
    await Patient.updateOne({ email: email }, 
      {"$pull": {"medicines": {drugName: drugName}}}, { safe:true, multi:true})

    res.send({success: 'ok'})
  }catch(err){
    res.send({error: err})
  }
}

drugController.translateDescription = async (req, res) => {
    const { text } = req.body
    const options = {
        method: "POST",
        url: "https://microsoft-translator-text.p.rapidapi.com/translate",
        params: {
            to: `he`,
            "api-version": "3.0",
            profanityAction: "NoAction",
            textType: "plain",
        },
        headers: {
            "content-type": "application/json",
            "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
            "x-rapidapi-key": `${process.env.TRANS_API_KEY}`,
        },
        data: [{ Text: text }],
    };
    axios
        .request(options)
        .then(function (response) {
            res.status(200).send(response.data[0].translations[0].text);
        })
        .catch(function (error) {
            res.status(400).send(error);
        });
  }


module.exports = drugController