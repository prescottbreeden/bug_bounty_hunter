DROP SCHEMA IF EXISTS bug_hunter;
CREATE SCHEMA bug_hunter;
USE bug_hunter;

CREATE TABLE users (
  user_id     INTEGER       NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  first_name  VARCHAR(255)  NOT NULL,
  last_name   VARCHAR(255)  NOT NULL,
  email       VARCHAR(255)  NOT NULL,
  password    VARCHAR(255)  NOT NULL,
  admin       TINYINT(1)    NOT NULL  DEFAULT 0,
  created_at  TIMESTAMP     NOT NULL  DEFAULT NOW(),
  updated_at  TIMESTAMP     NOT NULL  DEFAULT NOW()   ON UPDATE NOW()
);

CREATE TABLE bugs (
  bug_id      INTEGER       NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  user_id     INTEGER       NOT NULL,
  content     TEXT          NOT NULL,
  created_at  TIMESTAMP     NOT NULL  DEFAULT NOW(),
  updated_at  TIMESTAMP     NOT NULL  DEFAULT NOW()   ON UPDATE NOW(),

  FOREIGN KEY (user_id)
    REFERENCES users (user_id)
);

CREATE TABLE answers (
  answer_id   INTEGER       NOT NULL AUTO_INCREMENT   PRIMARY KEY,
  user_id     INTEGER       NOT NULL,
  bug_id      INTEGER       NOT NULL,
  content     LONGTEXT      NOT NULL,
  created_at  TIMESTAMP     NOT NULL  DEFAULT NOW(),
  updated_at  TIMESTAMP     NOT NULL  DEFAULT NOW()   ON UPDATE NOW(),

  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  
  FOREIGN KEY (bug_id)
    REFERENCES bugs (bug_id)
);

CREATE TABLE bug_upvotes (
  bug_upvote_id     INTEGER     NOT NULL  AUTO_INCREMENT    PRIMARY KEY,
  user_id           INTEGER     NOT NULL,
  bug_id            INTEGER     NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  
  FOREIGN KEY (bug_id)
    REFERENCES bugs (bug_id)
);

CREATE TABLE answer_upvotes (
  answer_upvote_id  INTEGER     NOT NULL  AUTO_INCREMENT    PRIMARY KEY,
  user_id           INTEGER     NOT NULL,
  answer_id         INTEGER     NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  
  FOREIGN KEY (answer_id)
    REFERENCES answers (answer_id)
);
