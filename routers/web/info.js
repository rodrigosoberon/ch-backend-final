const {Router} = require('express')
const infoWebRouter = Router()
const yargs = require('yargs/yargs')(process.argv.slice(2))
const args = yargs.argv
const logger = require('../../logger')

infoWebRouter.get('/info', (req, res)=>{
    const info = {
        entrada: args,
        plataforma: process.platform,
        version: process.version,
        memoria: process.memoryUsage().rss,
        path: process.cwd(),
        pid: process.pid,
    }
    console.log(info)
    res.render('info',{info})
})

module.exports = infoWebRouter