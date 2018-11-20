const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://will.ferens:w76h6Z{3@ds053449.mlab.com:53449/freesail', { useNewUrlParser: true })

const db = mongoose.connection


db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {

})

app.get('/', (req, res) => {
    res.json('welcome to beer 🍺')
})

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./routes/router')

app.use('/', routes)

app.listen(process.env.PORT || 3001, function() {
    console.log('listening on port 3001')
})