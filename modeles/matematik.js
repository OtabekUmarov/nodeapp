const {
  Schema,
  model
} = require('mongoose')

const matematik = new Schema({
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


module.exports = model('Matematik', matematik)