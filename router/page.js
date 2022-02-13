const {
    Router
} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Book = require('../modeles/book')
const Subject = require('../modeles/subject')
const Text = require('../modeles/text')




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

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Biz haqimizda',
        layout: "site",
        inner: "inner_page",
        isHome: true
    })
})

router.get('/subject', async (req, res) => {
    const subject = await Subject.find().lean()
    res.render('subject', {
        title: 'Boshqotirmalar',
        layout: "site",
        subject,
        inner: "inner_page",
        isHome: true
    })
})
router.get('/subject/:id', async (req, res) => {
    const id = req.params.id
    // const puzzle = await Puzzle.find({
    //     subjectId: id
    // }).lean()
    let count = await Text.count()
    var random = Math.floor(Math.random() * count)
    const text = await Text.findOne({
        subjectId: id
    }).skip(random).lean()
    res.render('question', {
        title: 'Boshqotirma',
        layout: "site",
        success: req.flash('success'),
        error: req.flash('error'),
        // puzzle,
        text,
        qu_id: id,
        inner: "inner_page",
        isHome: true
    })
})







router.post('/answer/:id', async (req, res) => {
    let _id = req.params.id
    const { answer } = req.body
    const question = await Text.findById(_id)
    let c = "0"
    if (answer == question.answer) {
        req.flash("success", "Togri javob")
        console.log(req.flash("answer"));
    } else {
        req.flash("error", "notogri javob")
    }
    res.redirect('/subject/' + req.body.qu_id)
})






router.post('/search', auth, async (req, res) => {
    const {
        st
    } = req.body
    const books = await Book.find({
        name: {
            $regex: '.*' + st.toLowerCase() + '.*'
        }
    }).select('_id name').lean()
    res.render('search', {
        title: `${st} so'zi bo'yicha qidiruv natijasi:`,
        books
    })
})

module.exports = router