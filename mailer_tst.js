const times = 3
const medName = 'Advil 200mg'
const amount = 2
const text = `${amount} יחידות  מהתרופה ${medName} - `

const nodeMailer = require('nodemailer')
const cron = require('node-cron')
require('dotenv').config()

const sendEmail = () => {
  const mailOptions = {
    from : 'medvisor44@gmail.com',
    to: 'itai.rozen@mail.huji.ac.il',
    subject: 'test',
    text: `\nהתרופות שעליך ליטול כעת הן:\n ${text}`

  }
  const account =  nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'medvisor44@gmail.com',
      pass: process.env.MEDVISOR_GMAIL_PASS
    }
  })
    account.sendMail(mailOptions,(err, info) => {
      if (err) console.log(err)
      else console.log('email sent')
    })
}

sendEmail()