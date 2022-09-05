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

    console.log(err)
    let errorObj = {};
    if (err.errors.length) {
      err.errors.forEach(e => {

        // set case value on model validator with custom validation msg
        // catch here and format with proper message and title
        switch (e.message) {

          case 'userEmailVal':
            err.title = 'User already exists';
            errorObj[e.path] = 'User with that email already exists';
            err.status = 403;
            break;

          case 'emailVal':
            err.title = 'Cannot be email';
            errorObj[e.path] = 'Username cannot be an email address';
            err.status = 403;
            break;

          case 'username must be unique':
            err.title = 'User already exists';
            errorObj[e.path] = 'User with that email already exists';
            err.status = 403;
            break;

        }
      });

      err.errors = errorObj;
    }


    //err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  let resErr = {};

  // if there are multiple errors, use the title, and error list
  // with key names of the error with the message for the value
  // if not display only the message and the status code per spec
  // this allows just the provided error-handling middleware to
  // meet handle all errors in prog and still meet spec.

  if (!err.errors || !Object.keys(err.errors).length){
    console.log('err.errors empty');
    resErr.message = err.message;
    resErr.status = err.status;
  } else {
    console.log(err);
    resErr.message = err.title
    resErr.status = err.status;
    resErr.errors = err.errors;
  }
  res.json(resErr);
});


module.exports = app;
