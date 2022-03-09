const {
    Router
} = require('express')
const router = Router()
// const auth = require('../middleware/auth')
const Subject = require('../modeles/subject')
const Question = require('../modeles/question')
const Message = require('../modeles/message')



router.get('/', (req, res) => {
    // req.flash("success", "Togri javob")
    res.render('index', {
        title: 'Bosh sahifa',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        isHome: true
    })
})



router.get('/subjects', async (req, res) => {
    let subject = await Subject.find().lean()
    subject.forEach(async (el) => {
        let count = await Question.findOne({
            subjectId: el._id
        }).count()
        el.count = count
    });
    res.render('subject', {
        title: 'Fanlar',
        layout: "site",
        subject,
        inner: "inner_page",
        isHome: true
    })
})

router.post('/answer/:id', async (req, res) => {
    let _id = req.params.id
    const {
        answer
    } = req.body
    const question = await Question.findById(_id)
    if (answer == question.answer) {
        req.flash("success", "Togri javob")
    } else {
        req.flash("error", "notogri javob")
    }
    res.redirect('/subject/' + req.body.qu_id)
})

router.get('/message', (req, res) => {
    res.render('message', {
        title: "Savol yuborish",
        layout: 'site',
        inner: "inner_page",
        success: req.flash('success'),
        error: req.flash('error'),
    })
})
router.post('/message/send/', async (req, res) => {
    const {
        name,
        surname,
        email,
        question,
        answer
    } = req.body
    const message = await new Message({
        name,
        surname,
        email,
        question,
        answer
    })
    await message.save()
    req.flash("success", "Savolingiz yuborildi!")
    res.redirect('/message')
})
module.exports = router