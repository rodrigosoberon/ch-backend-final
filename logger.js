// ---------------------------------------------------------------------------------
// SETUP DE LOGGER
const winston = require('winston')

const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'info' }),
        new winston.transports.File({ filename: 'warn.log', level:'warn' }),
        new winston.transports.File({ filename: 'error.log', level:'error' }),
    ]
})

//Prueba logger
// logger.info('mensaje de info')
// logger.warn('mensaje de warn')
// logger.error('mensaje de error')

module.exports = logger