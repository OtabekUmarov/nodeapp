const {
  Schema,
  model
} = require('mongoose')

const puzzle = new Schema({
  answer: {
    type: String,
    required: true
  },
  subjectId: {
    type: Schema.Types.ObjectId,
    ref: 'Subject'
  },
  type: {
    type: Number,
    default: 0
  },
  question: String,
})


module.exports = model('Puzzle', puzzle)