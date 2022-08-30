const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    console.log('validation errors: ', validationErrors)
    const errors = validationErrors
      .array()
      .reduce((acc, error) =>  {
      acc[error.param] = error.msg
      return acc;
    }, {});

    const err = Error('Validation error');
    err.errors = errors;
    err.status = 400;
    err.title = 'Validation error';
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors
};
