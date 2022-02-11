const express = require('express')
const cors = require('cors')
const path = require('path')
const scrape = require('./src/scraper')
require('dotenv').config()
const cron = require('node-cron')
const app = express()
const medRoutes = require('./routes/medRoutes')
const drugRoutes = require('./routes/drugRoutes')
const reminderRoutes = require('./routes/reminderRoutes')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')));

const currMonth = new Date().getMonth()
const currHour = new Date().getHours()

cron.schedule('0 3 1 3,9 *', () => {
   scrape()
})

app.use('/api', medRoutes)
app.use('/api/drug', drugRoutes)
app.use('/api/reminder', reminderRoutes)

const mongoUrl = `mongodb+srv://itai_rozen:${process.env.MONGO_PASS}@cluster0.sihrb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, () => console.log('connected to mongoDB'))
app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))