const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUpdateDreamInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (data.text && !Validator.isLength(data.text, { min: 1, max: 1000 })) {
    errors.text = 'Dream must be between 1 and 1000 characters';
  }

  if (data.tags && data.tags.length > 10) {
    errors.tags = 'Only 3 tags are allowed'
  }

  if (data.type 
      && !Validator.equals(data.type, 'dream') 
      && !Validator.equals(data.type, 'goal')) {
    errors.type = 'Type needs to be either dream or goal';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}