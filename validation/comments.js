const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.comment = validText(data.comment) ? data.comment : '';

  if (!Validator.isLength(data.comment, { min: 1, max: 300 })) {
    errors.comment = 'Comment must be between 1 and 300 characters';
  }

  if (Validator.isEmpty(data.comment)) {
    errors.comment = 'Comment cannot be empty';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}