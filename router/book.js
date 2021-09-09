const {Router} = require('express')
const router = Router()
const Genre = require('../modeles/genre')
const Book = require('../modeles/book')

router.get('/',async(req,res)=>{
    const books = await Book.find().lean()
    res.render('book/index',{
        title: 'Kitoblar ro`yhati',
        books
    })
})

router.get('/new',(req,res)=>{
    res.render('book/new',{
        title: 'Yangi kitobni kiritish'
    })
})

module.exports = router