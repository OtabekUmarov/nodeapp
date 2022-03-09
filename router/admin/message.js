const {
  Router
} = require('express')
const router = Router()
const Message = require('../../modeles/message')
const auth = require('../../middleware/auth')


router.get('/', auth, async (req, res) => {
  let message = await Message.find().lean()
  message = message.map((el) => {
    return {
      ...el,
      status: el.status == 0 ? 'Kelib tushgan' : el.status == 1 ? "Qabul qilingan" : "Rad etilgan"
    }
  })
  res.render('admin/message', {
    title: 'Kelib tushgan savollar',
    adminMessage: true,
    message
  })
})

router.get('/check/:status/:id', auth, async (req, res) => {
  let _id = req.params.id
  let status = req.params.status
  let message = await Message.findOne({
    _id
  })
  message.status = status
  await Message.findByIdAndUpdate(_id, message)
  res.redirect('/admin/message')
})

module.exports = router