USE bug_hunter;

 INSERT INTO users (first_name, last_name, email, password)
 VALUES ('Chuck', 'Norris', 'chuck@gmail.com', '12345'),
        ('Bob', 'Hope', 'hope@gmail.com', '12345'),
        ('Kris', 'Kringle', 'hohoho@gmail.com', '12345')
        ;

 INSERT INTO tags (tag_name)
 VALUES ('node'),
        ('npm'),
        ('angular'),
        ('mongo'),
        ('mongoose'),
        ('routing'),
        ('database'),
        ('ejs'),
        ('sockets'),
        ('oop'),
        ('express')
        ;

 INSERT INTO bugs (posted_by, title, traceback)
 VALUES (1, 'Test Bug 1', 'Test traceback 1...'),
        (1, 'Test Bug 2', 'Test traceback 2...'),
        (1, 'Test Bug 3', 'Test traceback 3...'),
        (1, 'Test Bug 4', 'Test traceback 4...'),
        (1, 'Test Bug 5', 'Test traceback 5...'),
        (2, 'Test Bug 6', 'Test traceback 6...'),
        (2, 'Test Bug 7', 'Test traceback 7...'),
        (2, 'Test Bug 8', 'Test traceback 8...'),
        (2, 'Test Bug 9', 'Test traceback 9...'),
        (2, 'Test Bug 10', 'Test traceback 10...'),
        (2, 'Test Bug 11', 'Test traceback 11...')
        ;

 INSERT INTO answers (posted_by, bug_id, content)
 VALUES (1, 2, 'Test Answer 1'),
        (1, 2, 'Test Answer 2'),
        (1, 2, 'Test Answer 3'),
        (1, 2, 'Test Answer 4'),
        (1, 2, 'Test Answer 5'),
        (2, 1, 'Test Answer 6'),
        (2, 1, 'Test Answer 7'),
        (2, 1, 'Test Answer 8'),
        (2, 1, 'Test Answer 9'),
        (2, 1, 'Test Answer 10'),
        (2, 1, 'Test Answer 11')
        ;

 INSERT INTO answers_upvotes (user_id, answer_id)
 VALUES (2, 1),
        (2, 2),
        (3, 2),
        (2, 3),
        (1, 6),
        (1, 8)
        ;

 INSERT INTO bugs_upvotes (user_id, bug_id)
 VALUES (2, 3),
        (2, 5),
        (3, 5),
        (1, 6),
        (1, 7),
        (1, 9)
        ;