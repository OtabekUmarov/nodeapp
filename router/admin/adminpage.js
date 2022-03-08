const {
  Router
} = require('express')
const router = Router()
const auth = require('../../middleware/auth')
const Question = require('../../modeles/question')
const Text = require('../../modeles/text')
const Matematik = require('../../modeles/matematik')
const Topishmoq = require('../../modeles/topishmoq')
const Interest = require('../../modeles/interest')
const Critical = require('../../modeles/critical')

router.get('/', auth, (req, res) => {
  res.render('admin', {
    title: 'Bosh sahifa',
    adminHome: true
  })
})


router.get('/search/:text', auth, async (req, res) => {
  let text = req.params.text
  const question = await Question.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  const matn = await Text.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  const matematik = await Matematik.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  const topishmoq = await Topishmoq.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  const interest = await Interest.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  const critical = await Critical.find({
    question: {
      $regex: '.*' + text.toLowerCase() + '.*'
    }
  }).lean()
  let response = []
  if (question) {
    question.forEach((el) => {
      response.push(el)
    })
  }
  if (matn) {
    matn.forEach((el) => {
      response.push(el)
    })
  }
  if (matematik) {
    matematik.forEach((el) => {
      response.push(el)
    })
  }
  if (topishmoq) {
    topishmoq.forEach((el) => {
      response.push(el)
    })
  }
  if (interest) {
    interest.forEach((el) => {
      response.push(el)
    })
  }
  if (critical) {
    critical.forEach((el) => {
      response.push(el)
    })
  }
  res.send(response);
})


module.exports = router