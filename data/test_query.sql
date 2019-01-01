USE bug_hunter;

-- User Data
   SELECT COUNT(DISTINCT b.bug_id) AS bugs,
          COUNT(DISTINCT a.answer_id) AS answers,
          COUNT(DISTINCT al.answer_like_id) AS alikes,
          COUNT(DISTINCT bl.bug_like_id) AS blikes
     FROM users AS u
LEFT JOIN bugs AS b
       ON b.posted_by = user_id
LEFT JOIN answers AS a
       ON a.answered_by = user_id
LEFT JOIN answers_likes AS al
       ON al.user_id = u.user_id
LEFT JOIN bugs_likes AS bl
       ON bl.user_id = u.user_id
    WHERE u.user_id = 4
 GROUP BY u.user_id;

-- Most bugs posted:
   SELECT CONCAT(u.first_name, ' ', u.last_name) AS name,
          COUNT(DISTINCT b.bug_id) AS bugs,
          COUNT(DISTINCT a.answer_id) AS answers,
          COUNT(DISTINCT al.answer_like_id) AS alikes,
          COUNT(DISTINCT bl.bug_like_id) AS blikes
     FROM users AS u
LEFT JOIN bugs AS b
       ON b.posted_by = user_id
LEFT JOIN answers AS a
       ON a.answered_by = user_id
LEFT JOIN answers_likes AS al
       ON al.user_id = u.user_id
LEFT JOIN bugs_likes AS bl
       ON bl.user_id = u.user_id
 GROUP BY u.user_id
 ORDER BY bugs DESC;