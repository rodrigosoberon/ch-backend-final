const {Router} = require('express')

const checkoutWebRouter = Router()

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

checkoutWebRouter.get('/account', checkAuthentication, (req, res) => {
    let user = req.user;
    res.render('account', user)
})

module.exports = checkoutWebRouter