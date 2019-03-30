USE bug_hunter;

-- User Data
--    SELECT COUNT(DISTINCT b.bug_id) AS bugs,
--           COUNT(DISTINCT a.answer_id) AS answers,
--           COUNT(DISTINCT al.answer_like_id) AS alikes,
--           COUNT(DISTINCT bl.bug_like_id) AS blikes
--      FROM users AS u
-- LEFT JOIN bugs AS b
--        ON b.posted_by = user_id
-- LEFT JOIN answers AS a
--        ON a.answered_by = user_id
-- LEFT JOIN answers_likes AS al
--        ON al.user_id = u.user_id
-- LEFT JOIN bugs_likes AS bl
--        ON bl.user_id = u.user_id
--     WHERE u.user_id = 4
--  GROUP BY u.user_id
-- ;

-- Most bugs posted:
--    SELECT CONCAT(u.first_name, ' ', u.last_name) AS name,
--           COUNT(DISTINCT b.bug_id) AS bugs,
--           COUNT(DISTINCT a.answer_id) AS answers,
--           COUNT(DISTINCT al.answer_like_id) AS alikes,
--           COUNT(DISTINCT bl.bug_like_id) AS blikes
--      FROM users AS u
-- LEFT JOIN bugs AS b
--        ON b.posted_by = user_id
-- LEFT JOIN answers AS a
--        ON a.answered_by = user_id
-- LEFT JOIN answers_likes AS al
--        ON al.user_id = u.user_id
-- LEFT JOIN bugs_likes AS bl
--        ON bl.user_id = u.user_id
--  GROUP BY u.user_id
--  ORDER BY bugs DESC
-- ;

-- get answers on bug view
--    SELECT b.bug_id, 
--           posted_by, 
--           error, 
--           traceback, 
--           message, 
--           bug_created, 
--           bug_updated, 
--           answer_id,
--           answered_by,
--           answer_content,
--           answer_created,
--           answer_updated
--      FROM bugs AS b 
-- LEFT JOIN answers AS a 
--        ON b.bug_id = a.bug_id 
--     WHERE b.bug_id = 2
-- ;

--    SELECT b.bug_id, 
--           posted_by, 
--           error, 
--           traceback, 
--           message, 
--           bug_created, 
--           COUNT(a.bug_id) AS num_answers,
--           COUNT(bl.bug_like_id) AS num_likes
--      FROM bugs AS b 
-- LEFT JOIN answers AS a 
--        ON b.bug_id = a.bug_id 
-- LEFT JOIN bugs_likes AS bl
--        ON b.bug_id = bl.bug_id
--  GROUP BY bug_id
-- ; 

-- is liked by user
--    SELECT b.bug_id,
--           bl.bug_like_id
--      FROM bugs AS b 
--      JOIN bugs_likes AS bl 
--        ON b.bug_id = bl.bug_id 
--     WHERE b.bug_id = 1
--       AND bl.user_id = 1
-- ;

--    SELECT IF(answer_like_id, 'true', 'false') AS likes
--      FROM answers_likes
--     WHERE answer_id = 1
--       AND user_id = 2
-- ;

--    UPDATE bugs 
--       SET view_count = view_count + 1 
--     WHERE bug_id = ?
-- ;

--        SELECT b.bug_id
--          FROM bugs AS b
--          JOIN favorites AS f
--            ON b.bug_id = f.bug_id
--         WHERE f.user_id = 2
-- ;
--        SELECT b.bug_id,
--               CONCAT(u.first_name, ' ', u.last_name) AS posted_by, 
--               error, 
--               traceback, 
--               message, 
--               view_count,
--               bug_created, 
--               COUNT(a.bug_id) AS num_answers
--          FROM bugs AS b 
--     LEFT JOIN answers AS a 
--            ON b.bug_id = a.bug_id 
--     LEFT JOIN users AS u
--            ON b.posted_by = u.user_id
--          JOIN favorites AS f
--            ON b.bug_id = f.bug_id
--         WHERE f.user_id = 2
--      GROUP BY b.bug_id
--      ORDER BY b.bug_created DESC;

      --  SELECT user_id,
      --         faction_name,
      --         first_name,
      --         last_name,
      --         email,
      --         admin,
      --         profile_img,
      --         konami_unlock,
      --         user_created,
      --         user_updated
      --    FROM users AS u
      --    JOIN factions AS f
      --      ON f.faction_id = u.faction_id
      --   WHERE email = 'pbreeden@codingdojo.com';


--        SELECT 
--               f.faction_name,
--               f.faction_id,
--               COUNT(DISTINCT b.bug_id) AS bugs,
--               COUNT(DISTINCT answer_id) AS answers
--          FROM users AS u
--     LEFT JOIN bugs AS b
--            ON b.posted_by = u.user_id
--     LEFT JOIN answers AS a
--            ON a.answered_by = u.user_id
--     LEFT JOIN factions AS f
--            ON f.faction_id = u.faction_id
--         GROUP BY u.faction_id;

-- ALTER TABLE answers ADD COLUMN accepted  BOOLEAN  DEFAULT 0;

-- begin;

-- alter table answers
-- drop constraint orders_customer_id_fkey;

-- alter table orders
-- add constraint orders_customer_id_fkey
-- foreign key (customer_id)
-- references customers (id)
-- on delete cascade;

-- commit;