DROP DATABASE IF EXISTS techblog_db;

CREATE DATABASE techblog_db;

USE techblog_db;

SELECT * FROM post;
SELECT * FROM user;

SELECT * FROM post WHERE user_id = 1;
SELECT post.id, post.title, post.content, post.user_id, user.username FROM post INNER JOIN user ON user.id = post.user_id;