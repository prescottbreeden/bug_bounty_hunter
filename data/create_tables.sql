DROP SCHEMA IF EXISTS bug_hunter;
CREATE SCHEMA bug_hunter;
USE bug_hunter;

CREATE TABLE users (
  user_id       INTEGER       NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  first_name    VARCHAR(255)  NOT NULL,
  last_name     VARCHAR(255)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  password      VARCHAR(255)  NOT NULL,
  admin         TINYINT(1)    NOT NULL  DEFAULT 0,
  user_created  TIMESTAMP     NOT NULL  DEFAULT NOW(),
  user_updated  TIMESTAMP     NOT NULL  DEFAULT NOW()   ON UPDATE NOW()
);

CREATE TABLE tags (
  tag_id      INTEGER       NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  tag_name    VARCHAR(255)  NOT NULL
);

CREATE TABLE bugs (
  bug_id      INTEGER       NOT NULL  AUTO_INCREMENT  PRIMARY KEY,
  posted_by   INTEGER       NOT NULL,
  error       VARCHAR(255)  NOT NULL,
  traceback   TEXT          NOT NULL,
  message     TEXT          NOT NULL,
  bug_created TIMESTAMP     NOT NULL  DEFAULT NOW(),
  bug_updated TIMESTAMP     NOT NULL  DEFAULT NOW()   ON UPDATE NOW(),

  FOREIGN KEY (posted_by)
    REFERENCES users (user_id)
);

CREATE TABLE answers (
  answer_id       INTEGER     NOT NULL AUTO_INCREMENT   PRIMARY KEY,
  bug_id          INTEGER     NOT NULL,
  answered_by     INTEGER     NOT NULL,
  answer_content  LONGTEXT    NOT NULL,
  answer_created  TIMESTAMP   NOT NULL  DEFAULT NOW(),
  answer_updated  TIMESTAMP   NOT NULL  DEFAULT NOW()   ON UPDATE NOW(),

  FOREIGN KEY (answered_by)
    REFERENCES users (user_id),
  
  FOREIGN KEY (bug_id)
    REFERENCES bugs (bug_id)
);

CREATE TABLE bugs_likes (
  bug_like_id     INTEGER     NOT NULL  AUTO_INCREMENT    PRIMARY KEY,
  user_id           INTEGER     NOT NULL,
  bug_id            INTEGER     NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  
  FOREIGN KEY (bug_id)
    REFERENCES bugs (bug_id)
);

CREATE TABLE answers_likes (
  answer_like_id  INTEGER     NOT NULL  AUTO_INCREMENT    PRIMARY KEY,
  user_id           INTEGER     NOT NULL,
  answer_id         INTEGER     NOT NULL,

  FOREIGN KEY (user_id)
    REFERENCES users (user_id),
  
  FOREIGN KEY (answer_id)
    REFERENCES answers (answer_id)
);

CREATE TABLE bugs_tags (
  bug_tag_id        INTEGER     NOT NULL  AUTO_INCREMENT    PRIMARY KEY,
  tag_id            INTEGER     NOT NULL,
  bug_id            INTEGER     NOT NULL,

  FOREIGN KEY (tag_id)
    REFERENCES tags (tag_id),
  
  FOREIGN KEY (bug_id)
    REFERENCES bugs (bug_id)
);