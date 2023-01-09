const logger = require('../../logger')
const {Router} = require ('express')

const productosWebRouter = Router()

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

productosWebRouter.get('/home',checkAuthentication, (req, res) => {
    const user = req.user;
    res.render('home', user)
})

module.exports = productosWebRouter