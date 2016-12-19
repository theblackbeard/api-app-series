"use strict";

const
    express = require('express')
,   UserController = require('../app/controllers/user-controller')
,   SerieController = require('../app/controllers/serie-controller')
,   Auth = require('./middleware/auth-main')
,   api = express.Router();


const ra = Auth.requireLogin;

api.use((req, res, next) => {
    console.log("Middleware of Routes");
    next();
});

/*USERS MANAGER */
api.param('userID', UserController.init);
api.get('/users', ra, UserController.index);
api.get('/users/:userID',ra, UserController.show);
api.post('/users/add', ra, UserController.add);
api.post('/users/auth', UserController.auth);
api.post('/users/exists', UserController.userExists);
api.post('/users/profile', ra, UserController.profile);
api.put('/users/:userID/edit', ra,UserController.edit);
api.delete('/users/:userID/remove', ra, UserController.remove);

/*SERIE MANAGER */
api.param('serieID', SerieController.init);
api.get('/series', SerieController.index);
api.get('/series/:serieID', SerieController.show);
api.get('/series/:serieID/e/:episodeID', SerieController.episode);
api.post('/series/add', SerieController.add);
api.post('/series/add/e', SerieController.addE);
api.put('/series/:serieID/edit', SerieController.edit);
api.delete('/series/:serieID/cancel', SerieController.cancel);

/* */


module.exports = api;

