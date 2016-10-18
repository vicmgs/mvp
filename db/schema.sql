CREATE DATABASE racer;

USE racer;

CREATE TABLE users (
  id INTEGER(4) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50),
  password VARCHAR(50),
  PRIMARY KEY (id),
  UNIQUE KEY id_unique1 (username)
);


-- mysql -u root < db/schema.sql
