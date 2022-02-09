module.exports = (req, res, next) => {
    // console.log(req.session);
    if (!req.session.isAuthed) {
        return res.redirect('/auth/login')
    }
    next()
}