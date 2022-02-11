const {
  Router
} = require('express')
const router = Router()
const Subject = require('../../modeles/subject')
const auth = require('../../middleware/auth')


router.get('/', auth, async (req, res) => {
  const subject = await Subject.find().lean()
  res.render('admin/subject', {
    title: 'Fanlar ',
    adminSubject: true,
    add: '/admin/subject/create',
    subject
  })
})
router.get('/create', auth, (req, res) => {
  res.render('admin/subject/create', {
    title: "Fan qo'shish",
    adminSubject: true,
  })
})
router.post('/', auth, async (req, res) => {
  const sub = await new Subject(req.body)
  await sub.save()
  res.redirect('/admin/subject')

})





module.exports = router