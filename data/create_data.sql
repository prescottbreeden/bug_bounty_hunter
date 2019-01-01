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

 INSERT INTO bugs (posted_by, error, traceback)
 VALUES (1, 'error TS2339: Property "length" does not exist on type "Object".', 'Test traceback 1...'),
        (2, 'error TS2339: Property "length" does not exist on type "Object".', 'Test traceback 10...'),
        (2, 'error TS2339: Property "length" does not exist on type "Object".', 'Test traceback 11...')
        ;

 INSERT INTO answers (answered_by, bug_id, answer_content)
 VALUES (1, 2, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (1, 2, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (1, 2, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (1, 2, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (1, 2, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... '),
        (2, 1, 'This is the answer that never ends... yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the song that doesnt end, yes it goes on and on my friends, some people started reading it not knowing what it was, and now theyll keep on reading it forever just because this is the answer that never ends... ')
        ;

 INSERT INTO answers_likes (user_id, answer_id)
 VALUES (2, 1),
        (2, 2),
        (3, 2),
        (2, 3),
        (1, 6),
        (1, 8)
        ;

 INSERT INTO bugs_likes (user_id, bug_id)
 VALUES (2, 3),
        (2, 5),
        (3, 5),
        (1, 6),
        (1, 7),
        (1, 9)
        ;