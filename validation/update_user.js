const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUpdateUserInput(data) {
  let errors = {};

  data.bio = validText(data.bio) ? data.bio : '';

  if (data.bio && !Validator.isLength(data.bio, { min: 1, max: 100 })) {
    errors.bio = 'Bio cannot be longer than 100 characters';
  }

  if (data.age && !Validator.isLength(data.age, { min: 1, max: 10 })) {
    errors.age = "Age cannot be longer than 10 characters";
  }

  if (data.location && !Validator.isLength(data.location, { min: 1, max: 40 })) {
    errors.location = "Location cannot be longer than 40 characters";
  }
}