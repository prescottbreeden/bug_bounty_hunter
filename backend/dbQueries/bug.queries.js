module.exports = {

  queryAllBugs:
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
     GROUP BY b.bug_id
     ORDER BY b.bug_created DESC`,

  queryBugById:
      `SELECT b.bug_id,
              posted_by,
              CONCAT(u.first_name, ' ', u.last_name) AS posted_name,
              u.profile_img AS posted_profile,
              error,
              traceback,
              message,
              view_count,
              bug_created,
              bug_updated,
              answer_id,
              CONCAT(u2.first_name, ' ', u2.last_name) AS answered_name,
              answered_by,
              u2.profile_img AS answer_profile,
              answer_content,
              accepted,
              answer_created,
              answer_updated
         FROM bugs AS b
    LEFT JOIN answers AS a
           ON b.bug_id = a.bug_id
    LEFT JOIN users AS u
           ON b.posted_by = u.user_id
    LEFT JOIN users AS u2
           ON a.answered_by = u2.user_id
        WHERE b.bug_id = ?
     ORDER BY a.accepted DESC, a.answer_created`,

  queryNewBug:
      `INSERT INTO bugs SET ?`,

  queryUpdateBug:
      `UPDATE bugs SET error = ?, traceback = ?, message = ? WHERE bug_id = ?`,

  queryDeleteBug:
      `DELETE
         FROM answers
        WHERE bug_id = ?;

       DELETE
         FROM favorites
        WHERE bug_id = ?;

       DELETE
         FROM bugs
        WHERE bug_id = ?`,


  queryIncrementCounter:
      `UPDATE bugs SET view_count = view_count + 1 WHERE bug_id = ?`,


}