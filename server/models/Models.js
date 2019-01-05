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
    profile_img: user['profile_img'],
    konami_unlock: user['konami_unlock'],
    user_created: user['user_created'],
    user_updated: user['user_updated']
  }
}

function Bug(bug) {
  return {
    bug_id: bug['bug_id'],
    user_id: bug['user_id'],
    error: bug['error'],
    traceback: bug['traceback'],
    bug_created: bug['bug_created'],
    bug_updated: bug['bug_updated']
  }
}

function Answer (answer) {
  return {
    answer_id: answer['answer_id'],
    bug_id: answer['bug_id'],
    answered_by: answer['answered_by'],
    answer_content: answer['answer_content'],
    answer_created: answer['answer_created'],
    ansert_updated: answer['answer_updated']
  }
}