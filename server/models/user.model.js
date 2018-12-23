module.exports = function (user) {
  return {
    id: user['user_id'],
    first_name: user['first_name'],
    last_name: user['last_name'],
    email: user['email'],
    admin: user['admin'],
    created_at: user['created_at'],
    updated_at: user['updated_at']
  }
}

