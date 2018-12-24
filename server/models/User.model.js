const email_reg = '/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'

module.exports = {
  ValidateUser,
}

function ValidateUser(newUser) {
  errors = [];
  if (newUser.first_name.length < 2) {
    errors.push({
      type: 'first_name',
      message: 'First name must be at least 2 characters long.',
    });
  }
  if (newUser.last_name.length < 2) {
    errors.push({
      type: 'last_name',
      message: 'Last name must be at least 2 characters long.',
    });
  }
  if (!newUser.email) {
    errors.push({
      type: 'email',
      message: 'Email cannot be blank',
    });
  } else {
    if(!newUser.email.match(email_reg)) {
      errors.push({
        type: 'email',
        message: 'Passwords do not match',
      });
    }
  }

  if (newUser.first_name.length < 2) {
    errors.first_name = 'First name must be at least 2 characters long.'
    errors.push({
      type: 'first_name',
      message: 'First name must be at least 2 characters long.',
    })
  }
  return errors;
}