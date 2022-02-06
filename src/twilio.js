const res = require('express/lib/response');

require('dotenv').config({ path: './../.env' })
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const serviceId = process.env.TWILIO_SERVICE_ID
const verifySid = process.env.TWILIO_VERIFY_SID
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const phonePrefix = '+972'


const sendSms = (phoneNum, text) => {
  console.log(phoneNum)
  client.messages
    .create({
      body: text,
      messagingServiceSid: serviceId,
      to: `${phonePrefix}${phoneNum}`
    })
    .then(message => console.log('success'))
    .catch(err => console.log(err))
    .done();
}

const sendVerificationCode = (phoneNumber) => {
  client
    .verify
    .services(verifySid)
    .verifications
    .create({ to: `${phonePrefix}${phoneNumber}`, channel:'sms' })
    .then(data => console.log('verification code sent'))
    .catch(err => console.log(err))
  }

  const verifyPhone = (phoneNumber, code) => {
    console.log(phonePrefix+phoneNumber)
    client
      .verify
    .services(verifySid) 
      .verificationChecks
      .create({
        to: `${phonePrefix}${phoneNumber}`,
        code: code
      })
      .then(data => { client
                      .validationRequests
                      .create({friendlyName:'test', phoneNumber:`${phonePrefix}${phoneNumber}`})
                      .then(data => console.log('added to outgoing callers'))
                      .catch(err => console.log(err))
                    })
      .catch(err => console.log(err))
  }

  app.post('/phone/validate',  async (req, res) => {
    try {       
            const { phone } = await req.body
            sendVerificationCode(phone)
            res.status(200).send(`in a few seconds you will a 4-digit code. please fill it below`)
    }catch(err){
            res.status(200).send(`Error: ${err}`)
    }
})

app.post('/phone/verify', async (req,res) => {
    try {
            const { phone, code } = await req.body
            verifyPhone(phone, code)
            res.send('verified!')
    }catch(err){
            console.log(err)
            res.end()
    }
})

app.post('/phone/sms', async (req,res) => {
    try {
            const { phone, sms } = await req.body
            sendSms(phone, sms)
            res.end()
    }catch(err){
            console.log(err)
            res.end()
    }
})

  module.exports = { sendSms, sendVerificationCode, verifyPhone }