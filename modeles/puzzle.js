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
  img: String,
})


module.exports = model('Puzzle', puzzle)