const {
  Router
} = require('express')
const router = Router()
const Subject = require('../../modeles/subject')
const Question = require('../../modeles/question')
const Text = require('../../modeles/text')
const Matematik = require('../../modeles/matematik')
const Topishmoq = require('../../modeles/topishmoq')
const Interest = require('../../modeles/interest')
const Critical = require('../../modeles/critical')


const auth = require('../../middleware/auth')


router.get('/', auth, async (req, res) => {
  const subject = await Subject.find().lean()
  res.render('admin/puzzle', {
    title: 'Boshqotirmalar',
    subject,
    adminPuzzle: true
  })
})

router.get('/:id/puzzleimg/', auth, async (req, res) => {

  const subjectId = req.params.id
  res.render('admin/puzzle/puzzleimg', {
    title: 'Boshqotirmalar',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/text/', auth, async (req, res) => {

  const subjectId = req.params.id
  res.render('admin/puzzle/text', {
    title: 'Matnli boshqotirma',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/matematik/', auth, async (req, res) => {
  const subjectId = req.params.id
  res.render('admin/question/matematik', {
    title: 'Matematik boshqotirma',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/topishmoq/', auth, async (req, res) => {
  const subjectId = req.params.id
  res.render('admin/question/topishmoq', {
    title: 'Topishmoq',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/interest/', auth, async (req, res) => {
  const subjectId = req.params.id
  res.render('admin/question/interest', {
    title: 'Qiziqarli savollar',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/critical/', auth, async (req, res) => {
  const subjectId = req.params.id
  res.render('admin/question/critical', {
    title: 'Mantiqiy savollar',
    subjectId,
    adminPuzzle: true
  })
})

router.get('/puzzleimg/delete/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})

router.get('/text/delete/:id', async (req, res) => {
  await Text.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})

router.get('/matematik/delete/:id', async (req, res) => {
  await Matematik.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})
router.get('/topishmoq/delete/:id', async (req, res) => {
  await Topishmoq.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})
router.get('/interest/delete/:id', async (req, res) => {
  await Interest.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})
router.get('/critical/delete/:id', async (req, res) => {
  await Critical.findByIdAndDelete(req.params.id)
  res.redirect('/admin/puzzle')
})


router.get('/:id/subject', auth, async (req, res) => {
  let id = req.params.id
  const question = await Question.find({
    subjectId: id
  }).lean()
  const text = await Text.find({
    subjectId: id
  }).lean()
  const matematik = await Matematik.find({
    subjectId: id
  }).lean()
  const topishmoq = await Topishmoq.find({
    subjectId: id
  }).lean()
  const interest = await Interest.find({
    subjectId: id
  }).lean()
  const critical = await Critical.find({
    subjectId: id
  }).lean()
  res.render('admin/puzzle/view', {
    title: 'Question',
    question,
    text,
    matematik,
    topishmoq,
    critical,
    interest,
    adminQuestion: true
  })
})




router.post('/', auth, async (req, res) => {
  const {
    answer,
    subjectId
  } = req.body
  const question = req.file.path
  const puzzle = await new Question({
    answer,
    subjectId,
    question
  })
  await puzzle.save()
  res.redirect('/admin/puzzle')

})
router.post('/text', auth, async (req, res) => {

  const text = await new Text(req.body)
  await text.save()
  res.redirect('/admin/puzzle')

})


router.post('/matematik', auth, async (req, res) => {
  const matematik = await new Matematik(req.body)
  await matematik.save()
  res.redirect('/admin/puzzle')

})

router.post('/topishmoq', auth, async (req, res) => {
  const topishmoq = await new Topishmoq(req.body)
  await topishmoq.save()
  res.redirect('/admin/puzzle')
})
router.post('/interest', auth, async (req, res) => {
  const interest = await new Interest(req.body)
  await interest.save()
  res.redirect('/admin/puzzle')
})
router.post('/critical', auth, async (req, res) => {
  const critical = await new Critical(req.body)
  await critical.save()
  res.redirect('/admin/puzzle')
})


module.exports = router