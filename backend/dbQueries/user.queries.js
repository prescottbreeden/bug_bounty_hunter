module.exports = {

  queryAllUsers:
      `SELECT user_id,
              faction_name,
              first_name,
              last_name,
              email,
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated,
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id`,

  queryUserByEmail:
      `SELECT first_name,
              last_name,
              email,
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers,
              COUNT(DISTINCT favorite_id) AS favorites,
         FROM users AS u
         JOIN factions as f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS f
           ON f.user_id = u.user_id
        WHERE u.email = ?
        GROUP BY u.user_id
        ORDER BY bugs DESC`,

  queryUserById:
      `SELECT first_name,
              last_name,
              email,
              admin,
              profile_img,
              konami_unlock,
              user_created,
              user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers,
              COUNT(DISTINCT favorite_id) AS favorites,
         FROM users AS u
         JOIN factions as f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS f
           ON f.user_id = u.user_id
        WHERE u.user_id = ?
        GROUP BY u.user_id
        ORDER BY bugs DESC`,

  queryUserStatsById:
      `SELECT u.konami_unlock,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers
         FROM users AS u
         JOIN factions as f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = u.user_id
    LEFT JOIN answers AS a
           ON a.answered_by = u.user_id
        WHERE u.user_id = ?
        GROUP BY u.user_id`,

  queryFactionStats:
      `SELECT COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT answer_id) AS answers
         FROM users AS u
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN factions AS f
           ON f.faction_id = u.faction_id
        WHERE f.faction_id = ?`,

  queryNewUser:
      `INSERT INTO users SET ?`,

  queryUpdateUser:
      `UPDATE users, SET ? WHERE user_id = ?`,

  queryUpdateProfilePic:
      `UPDATE users SET profile_img = ? WHERE user_id = ?`,

  queryKonami:
      `UPDATE users SET konami_unlock = true WHERE user_id = ?`

};
