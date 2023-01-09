const authMiddleware = (req, res, next) => {
    if (!req.session?.username || !req.session?.admin) {
        return res.status(401).send('<h1>No estas autorizado</h1>')
    }
    next()
}

module.exports = {
    authMiddleware
}