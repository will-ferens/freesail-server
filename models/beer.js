const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BeerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {type: String, required: true},
    style: {type: String, required: true},
    description: {type: String, required: false},
    abv: {type: Number},
    birthday: {type: Date, default: Date.now},
    labelImage: {type: String, required: false},
    votes: {type: Number, default: 0},
})

const Beer = mongoose.model('Beer', BeerSchema)

module.exports = Beer