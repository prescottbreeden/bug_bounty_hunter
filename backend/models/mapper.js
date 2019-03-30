module.exports = {
  MapUserData,
  Bug,
  Answer
}

function MapUserData(user) {
  return {
    user_id: parseInt(user['user_id']),
    faction_name: user['faction_name'],
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
    bug_id: parseInt(bug['bug_id']),
    user_id: parseInt(bug['user_id']),
    error: bug['error'],
    traceback: bug['traceback'],
    bug_created: bug['bug_created'],
    bug_updated: bug['bug_updated']
  }
}

function Answer (answer) {
  return {
    answer_id: parseInt(answer['answer_id']),
    bug_id: parseInt(answer['bug_id']),
    answered_by: parseInt(answer['answered_by']),
    answer_content: answer['answer_content'],
    answer_created: answer['answer_created'],
    ansert_updated: answer['answer_updated']
  }
}