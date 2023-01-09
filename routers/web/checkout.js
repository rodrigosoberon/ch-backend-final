const {Router} = require('express')
const twilio = require('../../twilio')
const checkoutWebRouter = Router()

const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

checkoutWebRouter.get('/checkout', checkAuthentication, (req, res) => {
    let username = req.user.name;
    (async () => {
        try {
            const message = await twilio.messages.create({
                body: "Compra realizada!",
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:'+ req.user.phone
            })

        } catch (err) {
            console.log(err)
        }
    })()
    res.render('checkout', {username})
})

module.exports = checkoutWebRouter