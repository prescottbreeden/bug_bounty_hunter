module.exports = {
  User,
  Bug,
  Answer
}

function User(user) {
  return {
    user_id: user['user_id'],
    first_name: user['first_name'],
    last_name: user['last_name'],
    email: user['email'],
    admin: user['admin'],
    created_at: user['created_at'],
    updated_at: user['updated_at']
  }
}

function Bug(bug) {
  return {
    bug_id: bug['bug_id'],
    user_id: bug['user_id'],
    title: bug['title'],
    traceback: bug['traceback'],
    created_at: bug['created_at'],
    updated_at: bug['updated_at']
  }
}

function Answer (answer) {
  return {
    answer_id: answer['answer_id'],
    user_id: answer['user_id'],
    bug_id: answer['bug_id'],
    content: answer['content'],
    created_at: answer['created_at'],
    updated_at: answer['updated_at']
  }
}