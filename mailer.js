const nodeMailer = require('nodemailer')
const cron = require('node-cron')
require('dotenv').config()

const sendEmail = (email, text, schedule) => {
  const mailOptions = {
    from : 'medvisor44@gmail.com',
    to: email,
    subject: 'הודעת תזכורת מmedVisor',
    text: `התרופות שעליך ליטול כעת הן: ${text}`

  }
  const account =  nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'medvisor44@gmail.com',
      pass: process.env.MEDVISOR_GMAIL_PASS
    }
  })
  cron.schedule(schedule, () => {
    account.sendMail(mailOptions,(err, info) => {
      if (err) console.log(err)
      else console.log('email sent')
    })
  }, { timezone:"Asia/Jerusalem"})
}


module.exports = sendEmail