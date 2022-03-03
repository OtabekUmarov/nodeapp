const {
  Router
} = require('express')
const router = Router()
const Subject = require('../modeles/subject')
const Question = require('../modeles/question')
const Text = require('../modeles/text')
const Matematik = require('../modeles/matematik')
const Topishmoq = require('../modeles/topishmoq')


// Rasmli boshqotirmalar
router.get('/img/:id', async (req, res) => {
  const id = req.params.id
  let count = await Question.find({
    subjectId: id
  }).count()
  let random = Math.floor(Math.random() * count)
  let question = await Question.findOne({
    subjectId: id
  }).skip(random).lean()
  let questionCount = await Question.find({
    subjectId: id
  }).lean()
  let textCount = await Text.find({
    subjectId: id
  }).lean()
  let topishmoqCount = await Topishmoq.find({
    subjectId: id
  }).lean()
  let matematikCount = await Matematik.find({
    subjectId: id
  }).lean()
  res.render('subject/img', {
    title: 'Rasmli boshqotirmalar',
    layout: "site",
    success: req.flash('success'),
    error: req.flash('error'),
    inner: "inner_page",
    isHome: true,
    question,
    questionCount,
    textCount,
    matematikCount,
    topishmoqCount,
    subjectId: id

  })
})
router.post('/answer/img/:id', async (req, res) => {
  let _id = req.params.id
  const {
    answer
  } = req.body
  const question = await Question.findById(_id)
  if (answer.toLowerCase() == question.answer.toLowerCase()) {
    req.flash("success", "To'gri javob")
  } else {
    req.flash("error", "Noto'gri javob")
  }
  res.redirect('/subject/img/' + req.body.subjectId)
})

// Matnli boshqotirmalar

router.get('/text/:id', async (req, res) => {
  const id = req.params.id
  let count = await Text.find({
    subjectId: id
  }).count()
  let random = Math.floor(Math.random() * count)
  let question = await Text.findOne({
    subjectId: id
  }).skip(random).lean()
  let questionCount = await Question.find({
    subjectId: id
  }).lean()
  let textCount = await Text.find({
    subjectId: id
  }).lean()
  let matematikCount = await Matematik.find({
    subjectId: id
  }).lean()
  let topishmoqCount = await Topishmoq.find({
    subjectId: id
  }).lean()
  res.render('subject/text', {
    title: 'Matnli boshqotirmalar',
    layout: "site",
    success: req.flash('success'),
    error: req.flash('error'),
    inner: "inner_page",
    isHome: true,
    question,
    questionCount,
    textCount,
    matematikCount,
    topishmoqCount,
    subjectId: id

  })
})
router.post('/answer/text/:id', async (req, res) => {
  let _id = req.params.id
  const {
    answer
  } = req.body
  const question = await Text.findById(_id)
  if (answer.toLowerCase() == question.answer.toLowerCase()) {
    req.flash("success", "Togri javob")
  } else {
    req.flash("error", "notogri javob")
  }
  res.redirect('/subject/text/' + req.body.subjectId)
})


// matematik boshqotirmalar
router.get('/matematik/:id', async (req, res) => {
  const id = req.params.id
  let count = await Matematik.find({
    subjectId: id
  }).count()
  let random = Math.floor(Math.random() * count)
  let question = await Matematik.findOne({
    subjectId: id
  }).skip(random).lean()
  let questionCount = await Question.find({
    subjectId: id
  }).lean()
  let textCount = await Text.find({
    subjectId: id
  }).lean()
  let matematikCount = await Matematik.find({
    subjectId: id
  }).lean()
  let topishmoqCount = await Topishmoq.find({
    subjectId: id
  }).lean()
  res.render('subject/matematik', {
    title: 'Matematik boshqotirmalar',
    layout: "site",
    success: req.flash('success'),
    error: req.flash('error'),
    inner: "inner_page",
    isHome: true,
    question,
    questionCount,
    matematikCount,
    topishmoqCount,
    textCount,
    subjectId: id
  })
})
router.post('/answer/matematik/:id', async (req, res) => {
  let _id = req.params.id
  const {
    answer
  } = req.body
  const question = await Matematik.findById(_id)
  if (answer.toLowerCase() == question.answer.toLowerCase()) {
    req.flash("success", "To'gri javob")
  } else {
    req.flash("error", "Noto'gri javob")
  }
  res.redirect('/subject/matematik/' + req.body.subjectId)
})

// topishmoq boshqotirmalar
router.get('/topishmoq/:id', async (req, res) => {
  const id = req.params.id
  let count = await Topishmoq.find({
    subjectId: id
  }).count()
  let random = Math.floor(Math.random() * count)
  let question = await Topishmoq.findOne({
    subjectId: id
  }).skip(random).lean()
  let questionCount = await Question.find({
    subjectId: id
  }).lean()
  let textCount = await Text.find({
    subjectId: id
  }).lean()
  let matematikCount = await Matematik.find({
    subjectId: id
  }).lean()
  let topishmoqCount = await Topishmoq.find({
    subjectId: id
  }).lean()

  res.render('subject/topishmoq', {
    title: 'Topishmoqlar',
    layout: "site",
    success: req.flash('success'),
    error: req.flash('error'),
    inner: "inner_page",
    isHome: true,
    question,
    questionCount,
    matematikCount,
    topishmoqCount,
    textCount,
    subjectId: id
  })
})
router.post('/answer/topishmoq/:id', async (req, res) => {
  let _id = req.params.id
  const {
    answer
  } = req.body
  const question = await Topishmoq.findById(_id)
  if (answer.toLowerCase() == question.answer && question.answer.toLowerCase()) {
    req.flash("success", "To'gri javob")
  } else {
    req.flash("error", "Noto'gri javob")
  }
  res.redirect('/subject/topishmoq/' + req.body.subjectId)
})


module.exports = router