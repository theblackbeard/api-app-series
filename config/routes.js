"use strict";

const
    express = require('express')
,   passport = require('passport')
,   UserController = require('../app/controllers/user-controller')
,   SerieController = require('../app/controllers/serie-controller')
,   Auth = require('./middleware/auth-main')
,   api = express.Router();

const rp = passport.authenticate('jwt', { session: false});
const ra = Auth.requireLogin;

api.use((req, res, next) => {
    console.log("Middleware of Routes");
    next();
});

/*USERS MANAGER */
api.param('userID', UserController.init);
api.get('/users', rp, UserController.index);
api.get('/users/:userID',rp, UserController.show);
api.post('/users/add', UserController.add);
api.post('/users/auth', UserController.auth);
api.post('/users/exists', UserController.userExists);
api.post('/users/profile', rp, UserController.profile);
api.put('/users/:userID/edit', ra,UserController.edit);
api.delete('/users/:userID/remove', ra, UserController.remove);

/*SERIE MANAGER LANGING PAGE & MOBILE*/
api.param('serieID', SerieController.init);
api.get('/series', SerieController.index);
api.get('/series/:serieID', SerieController.show);
api.post('/series/add', SerieController.add);
api.put('/series/:serieID/edit', SerieController.edit);
api.delete('/series/:serieID/remove', SerieController.remove);

/* */


module.exports = api;
