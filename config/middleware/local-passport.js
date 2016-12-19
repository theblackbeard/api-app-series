'use strict'
const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../app/user');

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.c.SECRET;
    console.log("fora")
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log("ok")
        User.findOne({id: jwt_payload.id}, function(err, user) {
            console.log(user)
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
