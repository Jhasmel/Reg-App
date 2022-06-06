const mongoose = require ('mongoose')
const mongoosePaginate= require('mongoose-paginate-v2')

const Register = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

Register.plugin(mongoosePaginate)
module.exports = mongoose.model('registration', Register)