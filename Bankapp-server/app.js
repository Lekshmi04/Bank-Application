var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session= require("express-session");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');

var app = express();
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(session({
  secret:"secretstring123",
  resave:false,
  saveUninitialized:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
function logMiddleware(req,res,next){
  console.log("logMiddleware");
  console.log(req.body);
   next();
}
app.use(logMiddleware);
function errorHandlingMiddleware(error,req,res,next){
res.send({"message":"An error occured"});
}
app.use(errorHandlingMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
