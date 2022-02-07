
const fs = require('fs')
const israMeds = fs.readFileSync('./src/israMeds.json')
const Patient = require('./../model/medUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {signIn, signUp} = require('./../utils/auth')
require('dotenv').config({path: './../.env'})
const medController = {}
medController.getMeds = (req, res) => {
  res.send(israMeds)
}

medController.authUser = async (req, res) => {
  const { isSignup, name, password, rePassword, email } = await req.body
  try {
    const result = isSignup ? 
    await signUp(name,email,password,rePassword) : 
    await signIn(email,password)
    if (result.error) throw result.error
    const token =  jwt.sign({email: result.email,id: result._id},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
      res.send({result, token})
  }catch(err){
    console.log(err)
    res.send({error:err})
  }
  
}



module.exports = medController