const bcrypt = require('bcryptjs')
const Patient = require('./../model/medUser')

const signIn = async (email,password) => {
  try {
    const chosenPatient = await Patient.findOne({ email : email})
    if (!chosenPatient) throw 'משתמה לא קיים'
    const isCorrectPassword = await bcrypt.compare(password, chosenPatient.password)
    if (!isCorrectPassword) throw 'סיסמה לא נכונה'
    return chosenPatient
  }catch(err){
    return {error: err}
  }
}

const signUp = async (name,email,password,rePassword) => {
  if (password !== rePassword) throw 'יש לרשום את הסיסמה פעמיים כדי להשלים את ההרשמה'
  const hashedPassword = await bcrypt.hash(password, 10)
  const patient = new Patient({name, email, password : hashedPassword})
  try {
    await patient.save()   
    return (patient)
  }catch(err){
    return {error: err}
  }
} 

module.exports = { signIn, signUp }