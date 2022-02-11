const {
  Router
} = require('express')
const router = Router()
const Subject = require('../../modeles/subject')
const Puzzle = require('../../modeles/puzzle')


const auth = require('../../middleware/auth')


router.get('/', auth, async (req, res) => {
  const subject = await Subject.find().lean()
  res.render('admin/puzzle', {
    title: 'Boshqotirmalar',
    subject,
    adminPuzzle: true
  })
})
router.post('/', auth, async (req, res) => {
  const {
    answer,
    subjectId
  } = req.body
  const img = req.file.path
  console.log(subjectId);
  const puzzle = await new Puzzle({
    answer,
    subjectId,
    img
  })
  await puzzle.save()
  res.redirect('/admin/puzzle')

})
router.get('/:id/puzzleimg', auth, async (req, res) => {

  const subjectId = req.params.id
  res.render('admin/puzzle/puzzleimg', {
    title: 'Boshqotirmalar',
    subjectId,
    adminPuzzle: true
  })
})
router.get('/:id/subject', auth, async (req, res) => {
  let id = req.params.id
  const puzzle = await Puzzle.find({
    subjectId: id
  }).lean()
  console.log(puzzle);
  res.render('admin/puzzle/view', {
    title: 'Puzzle',
    puzzle,
    adminPuzzle: true
  })
})



module.exports = router