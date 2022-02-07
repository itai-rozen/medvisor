
const israMeds = fs.readFileSync('./src/israMeds.json')
const Patient = require('./../model/medUser')
const bcrypt = require('bcryptjs')
const medController = {}
medController.getMeds = (req, res) => {
  res.send(israMeds)
}

const authUser = async (req, res) => {
  const { isSignup, name, password, rePassword, email } = await req.body
  if (isSignup){
    const hashedPassword = await bcrypt.hash(password, 10)
    const patient = new Patient({name, email, password : hashedPassword})
    try {
      await patient.save()   
      res.status(200).send(patient)
    }catch(err){
      res.status(400).send(err)
    }
  } else {
    try {

      const chosenPatient = await Patient.findOne({ email : email})
      if (!chosenPatient) throw new Error('user doesnt exist')
      const isCorrectPassword = await bcrypt.compare(password, chosenPatient.password)
      if (!isCorrectPassword) throw new Error('password is incorrect')
      res.status(200).send(chosenPatient)
    }catch(err){
      res.status(400).send(err)
    }
  }
}



module.exports = medController