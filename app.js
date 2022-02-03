const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios')
const scrape = require('./src/scraper')
require('dotenv').config()
const fs = require('fs')
const app = express()
app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'client/build')));
const israMeds = fs.readFileSync('./src/israMeds.json')


const currMonth = new Date().getMonth()
const currHour = new Date().getHours()

if (currMonth % 6 === 0 && currHour === 4) scrape()

app.get('/api', async (req,res) => {
        res.send(israMeds)        
})


app.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`))