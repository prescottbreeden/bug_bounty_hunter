
module.exports = {

  queryValidateEmail:
      `SELECT * FROM users WHERE email = ?`,

  queryLogin:
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.email = ?
     GROUP BY u.user_id`,

  queryGetUserById:
      `SELECT u.user_id,
              f.faction_name,
              u.first_name,
              u.last_name,
              u.email,
              u.password,
              u.admin,
              u.profile_img,
              u.konami_unlock,
              u.user_created,
              u.user_updated,
              COUNT(DISTINCT b.bug_id) AS bugs,
              COUNT(DISTINCT a.answer_id) AS answers,
              COUNT(DISTINCT fav.favorite_id) AS favorites
         FROM users AS u
         JOIN factions AS f
           ON f.faction_id = u.faction_id
    LEFT JOIN bugs AS b
           ON b.posted_by = user_id
    LEFT JOIN answers AS a
           ON a.answered_by = user_id
    LEFT JOIN favorites AS fav
           ON fav.user_id = u.user_id
        WHERE u.user_id = ?
     GROUP BY u.user_id`,
}
