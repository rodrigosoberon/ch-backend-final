const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const initServer = require('./server')
const yargs = require('yargs/yargs')(process.argv.slice(2))
const logger = require('./logger')
// const twilio = require('./twilio')

const app = initServer()

// ---------------------------------------------------------------------------------
//ARGUMENTOS

const args = yargs.default({
    p: 8080,
    m: 'FORK'
}).argv
const PORT = args.p
//const PORT = process.argv[2] || 8080
const MODE = args.m

// ---------------------------------------------------------------------------------
//EJECUTAR SERVIDOR

function runServer(){
    try{
        app.listen(PORT)
        logger.info(`Worker ${process.pid} started`)
    } catch (err){
        logger.error(err)
    }
}


// ---------------------------------------------------------------------------------
//SELECCION DE MODO (FORK O CLUSTER)

if(MODE === 'CLUSTER'){
    if(cluster.isPrimary){
        logger.info(`Master ${process.pid}`)
        for(let i=0; i < numCPUs; i++){
            cluster.fork()
        }
        cluster.on('exit', (worker, coder, sinal)=>{
            logger.info(`Worker ${worker.process.pid} died`)
        })
    }else{
        runServer()
    }
}else{
    runServer()
}

// ---------------------------------------------------------------------------------
//TEST TWILIO WHATSAPP

// (async () =>{
//     try{
//         const message = await twilio.messages.create({
//             body: "Mensaje de prueba! Servidor andando.",
//             from: 'whatsapp:+14155238886',
//             to:'whatsapp:+5491162576133'
//         })
//
//     }catch(err){
//         console.log(err)
//     }
// })()
