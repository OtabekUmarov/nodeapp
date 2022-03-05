const {
    Router
} = require('express')
const router = Router()
// const auth = require('../middleware/auth')
const Subject = require('../modeles/subject')
const Question = require('../modeles/question')
const Text = require('../modeles/text')
const Matematik = require('../modeles/matematik')
const Topishmoq = require('../modeles/topishmoq')
const Interest = require('../modeles/interest')





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

router.get('/subject/:id', async (req, res) => {
    const id = req.params.id
    let question = await Question.find({
        subjectId: id
    }).lean()
    let text = await Text.find({
        subjectId: id
    }).lean()
    let matematik = await Matematik.find({
        subjectId: id
    }).lean()
    let topishmoq = await Topishmoq.find({
        subjectId: id
    }).lean()
    let interest = await Interest.find({
        subjectId: id
    }).lean()

    let subject = await Subject.findById({
        _id: id
    }).lean()
    res.render('subjectId', {
        title: subject.name + ' fani',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        inner: "inner_page",
        isHome: true,
        question,
        text,
        matematik,
        topishmoq,
        interest,
        id,
        subject
    })
})

// router.get('/subject/:id', async (req, res) => {
//     const id = req.params.id
//     let count = await Question.count()
//     let random = Math.floor(Math.random() * count)
//     let subject = await Subject.findById({
//         _id: id
//     })
//     const question = await Question.findOne({
//         subjectId: id
//     }).skip(random).lean()
//     res.render('question', {
//         title: subject.name + ' fanidan boshqotirma',
//         layout: "site",
//         success: req.flash('success'),
//         error: req.flash('error'),
//         question,
//         qu_id: id,
//         inner: "inner_page",
//         isHome: true
//     })
// })

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






// router.post('/search', auth, async (req, res) => {
//     const {
//         st
//     } = req.body
//     const books = await Book.find({
//         name: {
//             $regex: '.*' + st.toLowerCase() + '.*'
//         }
//     }).select('_id name').lean()
//     res.render('search', {
//         title: `${st} so'zi bo'yicha qidiruv natijasi:`,
//         books
//     })
// })

module.exports = router