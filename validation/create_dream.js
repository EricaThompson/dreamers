const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCreateDreamInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 1, max: 1000 })) {
    errors.text = 'Dream must be between 1 and 1000 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (data.tags && data.tags.length > 3) {
    errors.tags = 'Only 10 tags are allowed'
  }

  if (!Validator.equals(data.type, 'dream') && !Validator.equals(data.type, 'goal')) {
    errors.type = 'Type needs to be either dream or goal';
  }

  if (Validator.isEmpty(data.type)) {
    errors.text = 'Type field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}