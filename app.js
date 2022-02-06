const express = require('express')
const cors = require('cors')
const path = require('path')
const scrape = require('./src/scraper')
require('dotenv').config()
const fs = require('fs')
const app = express()
const mongoose = require('mongoose')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')));
const israMeds = fs.readFileSync('./src/israMeds.json')


const currMonth = new Date().getMonth()
const currHour = new Date().getHours()

if (currMonth % 6 === 0 && currHour === 4) scrape()

app.get('/api', async (req, res) => {
        res.send(israMeds)
})


const mongoUrl = `mongodb+srv://itai_rozen:${process.env.MONGO_PASS}@cluster0.sihrb.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, () => console.log('connected to mongoDB'))
app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))