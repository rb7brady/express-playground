var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var companiesRouter = require('./routes/companies');
var iexRouter = require('./routes/iex');
var iexPublicRouter = require('./routes/publicAPI/iex/company');
//var rhPublicRouter = require('./routes/publicAPI/rh/orders');

var modRouter = require('./routes/modularTest');
var riptideRouter = require('./routes/riptide/riptideRouter');
var rhExpressRouter = require('./routes/publicAPI/rh/authExpress');
var ordersRoute = require('./routes/publicAPI/rh/orders');
var ordersOptionsRoute = require('./routes/publicAPI/rh/ordersOptions');
var divRouter = require('./routes/publicAPI/iex/dividends');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/companies', companiesRouter);
app.use('/iex/company', iexRouter);
app.use('/publicAPI/iex/company', iexPublicRouter);
//app.use('/publicAPI/rh/rh', rhPublicRouter);
app.use('/publicAPI/rh/orders', ordersRoute);
app.use('/publicAPI/rh/ordersOptions', ordersOptionsRoute);
app.use('/publicAPI/iex/dividend', divRouter);

//app.use('/publicAPI/rh/authenticate', rhAuthRouter);
app.use('/publicAPI/rh/authExpress', rhExpressRouter);

app.use('/mod', modRouter);
app.use('/rt',riptideRouter);
app.use(cors({
    origin: ['http://localhost:4200'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    preflightContinue: false
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
