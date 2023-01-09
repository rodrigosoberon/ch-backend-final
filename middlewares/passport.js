const passport = require('passport');
const bCrypt = require('bcrypt');
const mongoose = require('mongoose');
const config = require('../config');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usuario');
const transporter = require('../nodemailer')


mongoose.set('strictQuery', true);
function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

const initPassport = () => {

    try {
        mongoose.connect(config.mongoRemote.cnxStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'ecommerce'
        })
    } catch (err) {
        console.log(err)
    }

    passport.use('login', new LocalStrategy(
        (username, password, done) => {
            User.findOne({ username }, (err, user) => {
                if (err)
                    return done(err);
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                return done(null, user);
            });
        })
    );


    passport.use('signup', new LocalStrategy({
                passReqToCallback: true
            },
            //No agregar mas parámetros acá (rompe la callback). Tomar los campos de req.body.
            (req, username, password, done) => {
                User.findOne({'username': username}, function (err, user) {

                    if (err) {
                        console.log('Error in SignUp: ' + err);
                        return done(err);
                    }

                    if (user) {
                        console.log('User already exists');
                        return done(null, false)
                    }

                    const newUser = {
                        username: username,
                        password: createHash(password),
                        name: req.body.name,
                        address: req.body.address,
                        age: req.body.age,
                        phone: req.body.phone,
                        avatarURL: req.body.avatarURL
                    }

                    User.create(newUser, (err, userWithId) => {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            return done(err);
                        }
                        console.log('User Registration succesful');

                        //Envio de correo
                        transporter.sendMail({
                            from: 'Servidor Node.js',
                            to: process.env.TEST_MAIL,
                            subject: 'Nuevo usuario registrado: ' + username,
                            html:  `<h1>Nuevo usuario</h1>
                                    <p>Se registro el usuario ${username}</p>
                                    <p>Edad: ${req.body.age}</p>
                                    <p>Dirección: ${req.body.address}</p>
                                    <p>Teléfono: ${req.body.phone}</p>`
                        })

                        return done(null, userWithId);
                    });
                });
            })
    )


    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    })
}

module.exports = {initPassport}