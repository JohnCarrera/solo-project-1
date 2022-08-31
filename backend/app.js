const { environment } = require('./config');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const isProduction = environment === 'production';

const { ValidationError } = require('sequelize');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  //enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);


app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});


// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {

    console.log('processing sequelize errors');
    //err.errors = err.errors.map((e) => err.errors[e] = e.message);
    let errorObj = {};
    if (err.errors.length) {
      err.errors.forEach(e => {
        errorObj[e.path] = e.message;
      });
      err.errors = errorObj;
    }
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  let resErr = {};


  //if there are multiple errors, use the title, and error list
  // with key names of the error with the message for the value
  // if not display only the message and the status code per spec
  if (!err.errors){
    console.log('err.errors empty');
    resErr.message = err.message;
  } else {
    console.log('err.errors', err.errors)
    resErr.message = err.title
    resErr.errors = err.errors;
  }

  resErr.status = err.status;

  res.json(resErr);
});


module.exports = app;
