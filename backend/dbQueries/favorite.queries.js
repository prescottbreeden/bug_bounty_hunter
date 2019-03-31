module.exports = {
  queryGetFavorite:
      `SELECT f.user_id
         FROM bugs AS b
         JOIN favorites AS f
           ON b.bug_id = f.bug_id
        WHERE b.bug_id = ?
          AND f.user_id = ?`,

  queryNewFavorite:
      `INSERT INTO favorites SET ?`,

  queryGetAllFavorites:
      `SELECT b.bug_id,
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name,
              error,
              traceback,
              message,
              view_count,
              bug_created,
              COUNT(a.bug_id) AS num_answers
         FROM bugs AS b
    LEFT JOIN answers AS a
           ON b.bug_id = a.bug_id
    LEFT JOIN users AS u
           ON b.posted_by = u.user_id
         JOIN favorites AS f
           ON b.bug_id = f.bug_id
        WHERE f.user_id = ?
     GROUP BY b.bug_id
     ORDER BY b.bug_created DESC`,

  queryDeleteFavorite:
      `DELETE FROM favorites WHERE bug_id = ? AND user_id = ?`,

};
