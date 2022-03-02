const {
  Schema,
  model
} = require('mongoose')
const subject = new Schema({
  name: {
    type: String,
    required: true
  },
  img: String,
  content: String,
})
module.exports = model('Subject', subject)