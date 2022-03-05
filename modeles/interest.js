const {
  Schema,
  model
} = require('mongoose')

const interest = new Schema({
  answer: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },

})


module.exports = model('Interest', interest)