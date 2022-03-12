const mongoose = require('mongoose')

const ErrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [50, 'name can not be more than 50 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 9999,
    },
})

module.exports = mongoose.model('Errand', ErrandSchema)