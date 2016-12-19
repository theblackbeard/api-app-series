"use strict";

const
    express = require('express')
,   morgan = require('morgan')
,   parser = require('body-parser')
,   http = require('http')
,   passport = require('passport')
,   routes = require('./config/routes')
,   config = require('./config/config')
,   app = express();

require('./config/database-mongoose')(config.c);

app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(morgan('dev'));
app.use('/api', routes);


app.listen(3000);
console.log('Listening on port 3000');






