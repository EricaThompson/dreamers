const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateTagInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 1, max: 15 })) {
    errors.tag = 'Tag must be between 1 and 15 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.tag = 'Tag cannot be empty';
  }

  if (Validator.isIn(' ', data.name)) {
    errors.tag = 'Tag cannot have spaces'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}