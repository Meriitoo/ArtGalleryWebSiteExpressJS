const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

const { PORT } = require('./config/env');
const routes = require('./routes');
const { dbInit } = require('./config/db');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

app.engine('hbs', hbs.engine({ //for handlebars, extension to be hbs
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false })); //req.body like object to read it
app.use(express.static('public')); //for static files
app.use(cookieParser());
app.use(auth); // we want routes to associate with routers
app.use(routes); //from here search for routes to match
app.use(errorHandler);

dbInit();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

