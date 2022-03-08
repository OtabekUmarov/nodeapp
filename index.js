const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const session = require('express-session')
const csrf = require('csurf')
const MongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash') // !
const helmet = require('helmet')
const compression = require('compression')
// Routerlar
const adminpageRouter = require('./router/admin/adminpage')
const authRouter = require('./router/admin/auth')
const usersRouter = require('./router/admin/users')
const puzzleRouter = require('./router/admin/puzzle')
const subjectRouter = require('./router/admin/subject')


const pageRouter = require('./router/page')
const subjectsiteRouter = require('./router/subject')
// const usersRouter = require('./router/users')
const bookRouter = require('./router/book')
const genreRouter = require('./router/genre')
const profileRouter = require('./router/profile')

// middleWare lar
const varMid = require('./middleware/var')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys/pro')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'admin',
    extname: 'hbs'
})

hbs.handlebars.registerHelper("increment", function (index) {
    return parseInt(index) + 1
})
// hbs.handlebars.registerHelper('ifCond', function (v1, v2, v3, v4, v5) {
//     if (v1 || v2 || v3 || v4 || v5) {
//         return true
//     } else
//         return false
// });

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'))
app.use('/images', express.static('images')) // !

const store = new MongoStore({
    collection: 'session',
    uri: keys.MONGODB_URI
})
app.use(session({
    secret: keys.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 1200
        // 60 * 60 => 1 minut
    },
    store
}))

app.use(fileMiddleware.single('img'))
app.use(csrf())
app.use(flash()) // !
app.use(varMid)
app.use(helmet())
app.use(compression())

app.use(pageRouter)
app.use('/admin', adminpageRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/puzzle', puzzleRouter)
app.use('/admin/subject', subjectRouter)
app.use('/subject', subjectsiteRouter)


// app.use('/users', usersRouter)
app.use('/admin/auth', authRouter)
app.use('/book', bookRouter)
app.use('/genre', genreRouter)
app.use('/profile', profileRouter)


app.all('*', (req, res) => {
    res.status(404).render('404', {
        layout: "404"
    });
});
const port = process.env.PORT || '3000'
async function dev() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true
        })
        app.listen(port, () => {
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
    }
}
dev()