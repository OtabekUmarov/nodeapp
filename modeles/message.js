const {
  Schema,
  model
} = require('mongoose')

const message = new Schema({
  name: String,
  surname: String,
  email: String,
  question: String,
  answer: String,
  status: {
    type: Number,
    default: 0
  }
})

module.exports = model('Message', message)