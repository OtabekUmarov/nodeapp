const {
  Schema,
  model
} = require('mongoose')
const subject = new Schema({
  name: {
    type: String,
    required: true
  },
})
module.exports = model('Subject', subject)