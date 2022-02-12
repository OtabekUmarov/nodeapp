const {
    Router
} = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Book = require('../modeles/book')

router.get('/', (req, res) => {
    req.flash("success", "Ok")
    req.flash("error", "Error")
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